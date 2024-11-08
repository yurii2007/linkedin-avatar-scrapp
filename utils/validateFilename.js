import { FILENAME_RESERVED_REGEX } from '../constants/index.js';

/**
 * Validates a filename to ensure it meets specific criteria.
 *
 * @function validateFilename
 * @param {string} filename - The filename to validate.
 * @returns {boolean} Returns `true` if the filename is valid, otherwise `false`.
 *
 * The validation criteria are:
 * - The filename must not be empty.
 * - The filename must not exceed 255 characters.
 * - The filename must not contain reserved characters (as defined by FILENAME_RESERVED_REGEX).
 * - The filename must not be '.' or '..' (special directory references).
 */
export function validateFilename(filename) {
  if (
    !filename ||
    filename.length > 255 ||
    FILENAME_RESERVED_REGEX.test(filename) ||
    filename === '.' ||
    filename === '..'
  ) {
    return false;
  }

  return true;
}
