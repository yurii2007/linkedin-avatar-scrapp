import fs from 'fs/promises';
import logger from '../logger.js';

/**
 * Downloads an image from a specified URL and writes it to a file.
 *
 * @async
 * @function writeImageFromUrl
 * @param {string} url - The URL of the image to download.
 * @param {string} filename - The local file path to save the image to.
 * @returns {Promise<void>} Returns `null` if an error occurs, otherwise resolves to `void`.
 */
export async function writeImageFromUrl(url, filename) {
  try {
    if (isBase64(url)) {
      const buffer = Buffer.from(url, 'base64');
      await fs.writeFile(filename, buffer);
    } else {
      const res = await fetch(url, { method: 'GET' });
      const arrayBuffer = await res.arrayBuffer();
      await fs.writeFile(filename, Buffer.from(arrayBuffer));
    }
  } catch (error) {
    logger.error(
      `Error writing avatar ${url} to the file ${filename}: ${error}`,
    );
  }
}

function isBase64(text) {
  const utf8 = Buffer.from(text).toString('utf8');
  return !/[^\x00-\x7f]/.test(utf8);
}
