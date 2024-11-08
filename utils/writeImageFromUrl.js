import fs from 'fs/promises';

/**
 * Downloads an image from a given URL and saves it to the specified file.
 *
 * @param {string} url - The URL of the image to download.
 * @param {string} filename - The path and filename where the image will be saved.
 * @returns {Promise<void>} A promise that resolves when the image is successfully written.
 *
 * @throws {Error} Will throw an error if the fetch or file write operations fail.
 */
export async function writeImageFromUrl(url, filename) {
  const res = await fetch(url, { method: 'GET' });
  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(filename, Buffer.from(arrayBuffer));
}
