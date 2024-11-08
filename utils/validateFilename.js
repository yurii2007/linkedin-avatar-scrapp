import { FILENAME_RESERVED_REGEX } from '../constants/index.js';

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
