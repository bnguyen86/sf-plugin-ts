import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { convertLwcDirectory } from '../modules/convertJsTs';

const DEFAULT_LWC_PATH = './force-app/main/default/lwc';
const execPromise = promisify(exec);
const JS_FILE_REGEX = /create .*\.js\n/g;

export async function generateComponent(
    name: string,
    outputDir?: string,
    template?: string,
    apiVersion?: string
): Promise<string> {
    const { stdout } = await execPromise(
        generateCommandString(name, outputDir ?? DEFAULT_LWC_PATH, template, apiVersion)
    );
    const newComponentPath = (outputDir ?? DEFAULT_LWC_PATH) + '/' + name;
    await convertLwcDirectory(newComponentPath);
    return insertTsFileNames(stdout);
}

function generateCommandString(name: string, outputDir?: string, template?: string, apiVersion?: string): string {
    return (
        `sf lightning generate component --type lwc --name ${name} ` +
        `${outputDir ? '--output-dir ' + outputDir : ''} ` +
        `${template ? '--template ' + template : ''}` +
        `${apiVersion ? '--api-version ' + apiVersion : ''}`
    );
}

function insertTsFileNames(stdout: string): string {
    const jsFiles = stdout.match(JS_FILE_REGEX);
    const output = jsFiles?.reduce((newStdout, jsFile) => {
        const tsFile = jsFile.replace('.js\n', '.ts\n   ');
        const jsFileIndex = newStdout.indexOf(jsFile);
        const jsFileIndexEnd = jsFileIndex + tsFile.length;
        return [newStdout.slice(0, jsFileIndexEnd), tsFile, newStdout.slice(jsFileIndexEnd)].join('');
    }, stdout);

    return output ?? stdout;
}
