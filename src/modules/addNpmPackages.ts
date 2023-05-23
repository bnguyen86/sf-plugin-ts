import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

type ExecResult = {
    stdout: string;
    stderr: string;
};

export async function installPackages(): Promise<ExecResult> {
    return execPromise('npm install --save-dev typescript @types/jest');
}
