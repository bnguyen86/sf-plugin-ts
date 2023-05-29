import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

import { updateForceIgnore } from '../../modules/forceIgnore';
import { createTsConfig } from '../../modules/createTsConfig';
import { createTypes } from '../../modules/createTypes';
import { installPackages } from '../../modules/addNpmPackages';
import { convertLwcDirectory } from '../../modules/convertJsTs';
import { addScripts } from '../../modules/addNpmScripts';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('lwc-ts', 'ts.init');

const DEFAULT_BASE_PATH = './';
const DEFAULT_LWC_PATH = './force-app/main/default/lwc';

export type TsInitResult = {
    success: boolean;
};

export default class TsInit extends SfCommand<TsInitResult> {
    public static readonly summary = messages.getMessage('summary');
    public static readonly description = messages.getMessage('description');
    public static readonly examples = messages.getMessages('examples');

    public static readonly flags = {
        target: Flags.string({
            summary: messages.getMessage('flags.target.summary'),
            description: messages.getMessage('flags.target.description'),
            char: 't',
            required: false,
            default: DEFAULT_BASE_PATH,
        }),
        'lwc-target': Flags.string({
            summary: messages.getMessage('flags.lwcTarget.summary'),
            description: messages.getMessage('flags.lwcTarget.description'),
            char: 'l',
            required: false,
            default: DEFAULT_LWC_PATH,
        }),
        'convert-all-lwc': Flags.boolean({
            summary: messages.getMessage('flags.convertAll.summary'),
            description: messages.getMessage('flags.convertAll.description'),
            char: 'a',
            required: false,
        }),
    };

    public async run(): Promise<TsInitResult> {
        const { flags } = await this.parse(TsInit);

        const target = flags.target;
        const lwcTarget = flags['lwc-target'];
        const convertExistingLwc = flags['convert-all-lwc'];

        this.spinner.start(messages.getMessage('steps.installingTs'));
        await installPackages();
        this.spinner.stop();

        this.spinner.start(messages.getMessage('steps.updatingForceignore'));
        await updateForceIgnore(target);
        this.spinner.stop();

        this.spinner.start(messages.getMessage('steps.createTsConfig'));
        await createTsConfig(target);
        this.spinner.stop();

        this.spinner.start(messages.getMessage('steps.createTsTypes'));
        await createTypes(lwcTarget);
        this.spinner.stop();

        this.spinner.start(messages.getMessage('steps.addingScripts'));
        await addScripts(target);
        this.spinner.stop();

        if (convertExistingLwc) {
            this.spinner.start(messages.getMessage('steps.convertLwc'));
            await convertLwcDirectory(lwcTarget);
            this.spinner.stop();
        }

        return {
            success: true,
        };
    }
}
