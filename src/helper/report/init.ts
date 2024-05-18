import { ensureDir, emptyDir } from 'fs-extra';

try {
  ensureDir('test-results');
  emptyDir('test-results');
} catch (error) {
  console.log('Folder not created! ' + error);
}
