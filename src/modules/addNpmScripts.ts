import { readFile, writeFile } from 'node:fs/promises';

const PACKAGE_JSON_FILENAME = 'package.json';

export async function addScripts(targetPath: string): Promise<void> {
    const packageJsonContents = await readFile(`${targetPath}/${PACKAGE_JSON_FILENAME}`, { encoding: 'utf8' });
    const packageJson = JSON.parse(packageJsonContents) as Record<string, Record<string, string>>;

    packageJson.scripts['ts'] = 'node_modules/typescript/bin/tsc';
    packageJson.scripts['ts:watch'] = 'node_modules/typescript/bin/tsc --watch';

    return writeFile(`${targetPath}/${PACKAGE_JSON_FILENAME}`, JSON.stringify(packageJson, null, 2));
}
