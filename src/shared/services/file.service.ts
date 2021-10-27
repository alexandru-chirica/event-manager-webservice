import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { dirname, join } from 'path';

@Injectable()
export class FileService {
  // --- Properties ---
  private readonly baseFilePath = join(tmpdir(), 'event_manager');

  // --- Public methods ---

  async write(file: Buffer, path: string) {
    const fullPath = join(this.baseFilePath, path);
    const directory = dirname(fullPath);

    if (!existsSync(directory)) {
      await mkdir(directory);
    }

    return writeFile(fullPath, file);
  }
}
