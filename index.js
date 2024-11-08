import progressBar from 'cli-progress';
import puppeteer from 'puppeteer';
import { LINKEDIN_LOGIN_URL, environment, selectors } from './config.js';
import { getImageSrc, writeImageFromUrl } from './utils/index.js';

const loadingBar = new progressBar.SingleBar({});

(async () => {
  loadingBar.start(100, 0);
  const browser = await puppeteer.launch({
    browser: 'chrome',
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(LINKEDIN_LOGIN_URL);

  loadingBar.increment(10);

  await page.type(selectors.EMAIL_INPUT, environment.LINKEDIN_EMAIL);
  await page.type(selectors.PASSWORD_INPUT, environment.LINKEDIN_PASSWORD);

  loadingBar.increment(30);
  await page.click(selectors.SIGNIN_FORM_BTN);
  await page.waitForNavigation({ waitUntil: 'load' });

  loadingBar.increment(40);

  const imageLink = await page.evaluate(getImageSrc, selectors.AVATAR);
  await writeImageFromUrl(imageLink, 'test_img.webp');
  await browser.close();

  loadingBar.increment(20);
  loadingBar.stop();
  process.exit(0);
})();
