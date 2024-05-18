import { ensureDir, emptyDir } from 'fs-extra';
import { join } from 'path';

const testResultsPath = join(process.cwd(), 'test-results');

ensureDir(testResultsPath)
  .then(() => emptyDir(testResultsPath))
  .catch(error => {
    console.log(`Folder not created! ${error}`);
  });
