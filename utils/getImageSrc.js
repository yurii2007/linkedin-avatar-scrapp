/**
 * Retrieves the `src` attribute value of an image element specified by a CSS selector.
 *
 * @param {string} imageSelector - The CSS selector of the image element.
 * @returns {string} The `src` attribute value of the image.
 * @throws Will throw an error if no image is found with the specified selector.
 */
export function getImageSrc(imageSelector) {
  const image = document.querySelector(imageSelector);

  if (!image)
    throw new Error(`Image wiht CSS Selector ${imageSelector} not found`);

  return image.src;
}
