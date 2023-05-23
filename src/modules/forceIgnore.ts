import { readFile, writeFile } from 'node:fs/promises';
import { Messages } from '@salesforce/core';

const messages = Messages.loadMessages('lwc-ts', 'ts.init');

const FORCEIGNORE_FILENAME = '.forceIgnore';
const TS_IGNORE = `# TS Files
**/*.ts
**/lwc/types`;

/**
 * @description Update the contents of the .forceIgnore file to ignore .ts files
 * @export
 * @param {string} [targetPath='./']
 * @return {*}  {Promise<void>}
 */
export async function updateForceIgnore(targetPath: string): Promise<void> {
    const readForceIgnoreContents = await readForceIgnore(targetPath);

    const updatedFileContents = generateContents(readForceIgnoreContents);

    return writeFile(`${targetPath}/${FORCEIGNORE_FILENAME}`, updatedFileContents);
}

/**
 * @description Get the contents of the existing .forceIgnore file
 * @param {string} targetPath Path where existing file should be found
 * @return {Promise<string>}
 */
async function readForceIgnore(targetPath: string): Promise<string> {
    try {
        return await readFile(`${targetPath}/${FORCEIGNORE_FILENAME}`, { encoding: 'utf8' });
    } catch (error) {
        throw messages.createError('error.forceIgnoreNotFound');
    }
}

/**
 * @description Generate the contents of the .forceIgnore file
 * @param {string} currentContents
 * @todo check each line adn see if it exists instead of whole code block
 * @return {*}  {string}
 */
function generateContents(currentContents: string): string {
    if (currentContents.includes(TS_IGNORE)) {
        return currentContents;
    }

    return `${currentContents}\n${TS_IGNORE}\n`;
}
