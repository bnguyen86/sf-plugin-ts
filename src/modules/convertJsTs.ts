import { readdir, readFile, writeFile, access } from 'node:fs/promises';

export async function convertLwcDirectory(targetPath: string): Promise<string[] | undefined> {
    const files = await readdir(targetPath, { recursive: true });
    const filesToConvert = [];

    for (const file of files) {
        if (file.endsWith('.js')) {
            const fileToConvert = convertJs(targetPath, file);
            filesToConvert.push(fileToConvert);
        }
    }

    const results = await Promise.all(filesToConvert);
    return results;
}

export async function convertJs(targetPath: string, filePath: string): Promise<string> {
    const fullPath = targetPath + '/' + filePath;

    if (await doesTsExist(fullPath)) {
        return '   SKIPPING: ...' + filePath;
    }

    const jsContents = await readFile(fullPath, { encoding: 'utf8' });

    await writeFile(fullPath.replace('.js', '.ts'), jsContents);

    return '   Converting: ...' + filePath;
}

async function doesTsExist(jsPath: string): Promise<boolean> {
    const tsPath = jsPath.replace('.js', '.ts');
    try {
        await access(tsPath);
    } catch (error) {
        return false;
    }

    return true;
}
