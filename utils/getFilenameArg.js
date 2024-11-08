import {
  DEFAULT_FILENAME,
  supportedImageExtensions,
} from '../constants/index.js';
import logger from '../logger.js';
import { validateFilename } from './validateFilename.js';

export function getFilenameArg() {
  try {
    const filename = process.argv[2];
    if (!filename) {
      logger.debug('No filename provided, continue using default filename');

      return DEFAULT_FILENAME;
    } else {
      const isValid = validateFilename(filename);
      if (!isValid) {
        logger.debug(`Invalid filename provided, using default name: ${error}`);
        return DEFAULT_FILENAME;
      }

      if (
        filename.includes('.') &&
        !supportedImageExtensions.includes(filename.split('.')[1])
      ) {
        logger.debug(
          'Invalid image extension provided, continue with webp format',
        );
        return filename.replace(/\..*/, '.webp');
      }

      if (!filename.includes('.')) {
        return filename + '.webp';
      }
    }
    return filename;
  } catch (error) {
    logger.error(`Error parsing filename, using default name: ${error}`);
    return DEFAULT_FILENAME;
  }
}
