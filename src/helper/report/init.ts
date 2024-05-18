import { ensureDir, emptyDir } from 'fs-extra';
import { join } from 'path';

try {
  ensureDir(join(process.cwd(), 'test-results'));
  emptyDir(join(process.cwd(), 'test-results'));
} catch (error) {
  console.log('Folder not created! ' + error);
}
