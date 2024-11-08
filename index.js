import progressBar from 'cli-progress';
import puppeteer from 'puppeteer';
import { LINKEDIN_LOGIN_URL, environment, selectors } from './config.js';
import { getImageSrc, writeImageFromUrl } from './utils/index.js';
import logger from './logger.js';

const filename = 'test_image.webp';

const loadingBar = new progressBar.SingleBar({});

(async () => {
  try {
    logger.info(
      `Initiating LinkedIn profile image extraction for email: ${environment.LINKEDIN_EMAIL}`,
    );
    loadingBar.start(100, 0);
    const browser = await puppeteer.launch({
      browser: 'chrome',
      headless: !environment.dev,
    });

    const page = await browser.newPage();

    logger.debug(`Navigating to LinkedIn login page: ${LINKEDIN_LOGIN_URL}`);
    await page.goto(LINKEDIN_LOGIN_URL);

    loadingBar.increment(10);

    await page.type(selectors.EMAIL_INPUT, environment.LINKEDIN_EMAIL);
    await page.type(selectors.PASSWORD_INPUT, environment.LINKEDIN_PASSWORD);

    try {
      loadingBar.increment(30);
      logger.debug('Attempting to submit login form');
      await page.click(selectors.SIGNIN_FORM_BTN);
      await page.waitForNavigation({ waitUntil: 'load' });

      loadingBar.increment(40);
      logger.info('Login successful, navigating to profile page');
    } catch (error) {
      logger.error(`Login attempt failed: ${error}`);
      process.exit(1);
    }

    try {
      const imageLink = await page.evaluate(getImageSrc, selectors.AVATAR);
      logger.debug(`Profile image URL extracted: ${imageLink}`);

      await writeImageFromUrl(imageLink, 'test_img.webp');
      logger.info(`Profile image successfully downloaded as ${filename}`);
    } catch (error) {
      logger.error(
        `Failed to extract profile image from URL ${page.url()}: ${error}`,
      );
    }

    await browser.close();
    logger.info('Browser closed successfully');
    loadingBar.increment(20);
    loadingBar.stop();
  } catch (error) {
    logger.error(`An unexpected error occurred: ${error}`);
    process.exit(1);
  }

  logger.info(`Process completed`);
  process.exit(0);
})();
