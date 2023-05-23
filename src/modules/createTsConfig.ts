import { writeFile } from 'node:fs/promises';
import { tsconfig } from '../assets/tsconfig';

const DEFAULT_FILENAME = 'tsconfig.json';

export async function createTsConfig(targetPath: string): Promise<void> {
    return writeFile(`${targetPath}/${DEFAULT_FILENAME}`, JSON.stringify(tsconfig, null, 4));
}
