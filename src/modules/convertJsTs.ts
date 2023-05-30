import { readdir, readFile, writeFile, access } from 'node:fs/promises';

const COMPONENT_NAME_REGEX = /lwc\/.+?\//g;
const TSCONFIG_FILENAME = 'tsconfig.json';

export type ConversionResult = {
    status: 'SKIPPED' | 'CONVERTED';
    filePath: string;
};

export async function convertLwcDirectory(targetPath: string): Promise<ConversionResult[] | undefined> {
    const files = await traverseDir(targetPath, []);
    const filesToConvert = [];

    for (const file of files) {
        if (file.endsWith('.js')) {
            const fileToConvert = convertJs(file);
            filesToConvert.push(fileToConvert);
        }
    }

    const results = await Promise.all(filesToConvert);
    await addComponentsToConfigPath(files);

    return results;
}

async function traverseDir(path: string, allPaths: string[]): Promise<string[]> {
    const files = await readdir(path, { withFileTypes: true, encoding: 'utf-8' });

    for (const file of files) {
        const fullPath = path + '/' + file.name;
        allPaths.push(fullPath);
        if (file.isDirectory()) {
            // eslint-disable-next-line no-await-in-loop
            const subFiles = await traverseDir(fullPath, allPaths);
            allPaths.concat(subFiles);
        }
    }
    return allPaths;
}

export async function convertJs(filePath: string): Promise<ConversionResult> {
    const fullPath = filePath;

    if (await doesTsExist(fullPath)) {
        return {
            status: 'SKIPPED',
            filePath,
        };
    }

    const jsContents = await readFile(fullPath, { encoding: 'utf8' });

    await writeFile(fullPath.replace('.js', '.ts'), jsContents);

    return {
        status: 'CONVERTED',
        filePath,
    };
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

async function addComponentsToConfigPath(fullPaths: string[]): Promise<void> {
    const tsPaths = createTsPaths(fullPaths);
    const tsconfigContents = await readFile(`./${TSCONFIG_FILENAME}`, { encoding: 'utf8' });
    const tsconfig = JSON.parse(tsconfigContents) as Record<string, unknown>;
    const complierOptions = tsconfig.compilerOptions as Record<string, unknown>;

    // combine the old and new paths and sort them
    const updatePaths = Object.fromEntries(Object.entries({ ...(complierOptions.paths ?? {}), ...tsPaths }).sort());

    complierOptions.paths = updatePaths;

    return writeFile(`./${TSCONFIG_FILENAME}`, JSON.stringify(tsconfig, null, 4));
}

function createTsPaths(fullPaths: string[]): Record<string, string[]> {
    const tsPaths: Record<string, string[]> = {};

    for (const fullPath of fullPaths) {
        if (fullPath.includes('__tests__') || fullPath.includes('/lwc/types/')) {
            continue;
        }
        const componentName = extractComponentName(fullPath);
        if (componentName) {
            tsPaths['c/' + componentName] = [fullPath];
        }
    }

    return tsPaths;
}

function extractComponentName(fullPath: string): string | undefined {
    const componentNameMatches = fullPath.match(COMPONENT_NAME_REGEX);
    const componentNameMatch = componentNameMatches?.[0] ?? '';
    return componentNameMatch?.slice(4, componentNameMatch.length - 1);
}
