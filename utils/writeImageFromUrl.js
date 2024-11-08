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
    const res = await fetch(url, { method: 'GET' });
    const arrayBuffer = await res.arrayBuffer();
    await fs.writeFile(filename, Buffer.from(arrayBuffer));
  } catch (error) {
    logger.error(
      `Error writing avatar ${url} to the file ${filename}: ${error}`,
    );
  }
}
