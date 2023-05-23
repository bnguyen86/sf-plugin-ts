import { writeFile, mkdir } from 'node:fs/promises';
import { engineCustomTypes } from '../assets/engine-custom';

const TYPES_FILENAME = 'engine-custom.d.ts';

export async function createTypes(targetPath: string): Promise<void> {
    await mkdir(`${targetPath}/types/`, { recursive: true });
    return writeFile(`${targetPath}/types/${TYPES_FILENAME}`, engineCustomTypes);
}
