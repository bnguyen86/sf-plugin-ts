import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

import { generateComponent } from '../../../modules/generate';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('lwc-ts', 'ts.generate.component');

export type TsGenerateComponentResult = {
    path: string;
};

export default class TsGenerateComponent extends SfCommand<TsGenerateComponentResult> {
    public static readonly summary = messages.getMessage('summary');
    public static readonly description = messages.getMessage('description');
    public static readonly examples = messages.getMessages('examples');

    public static readonly flags = {
        name: Flags.string({
            summary: messages.getMessage('flags.name.summary'),
            description: messages.getMessage('flags.name.description'),
            char: 'n',
            required: true,
        }),
        'output-dir': Flags.string({
            summary: messages.getMessage('flags.output.summary'),
            description: messages.getMessage('flags.output.description'),
            char: 'd',
            required: false,
        }),
        template: Flags.string({
            summary: messages.getMessage('flags.template.summary'),
            description: messages.getMessage('flags.template.description'),
            options: ['default', 'analyticsDashboard', 'analyticsDashboardWithStep'],
            char: 't',
            required: false,
        }),
        'api-version': Flags.string({
            summary: messages.getMessage('flags.api.summary'),
            required: false,
        }),
    };

    public async run(): Promise<TsGenerateComponentResult> {
        const { flags } = await this.parse(TsGenerateComponent);

        const name = flags['name'];
        const outputDir = flags['output-dir'];
        const template = flags['template'];
        const apiVersion = flags['api-version'];

        await generateComponent(name, outputDir, template, apiVersion);

        return {
            path: '/Users/bnguyen/Workspace/lwc-ts/src/commands/ts/generate/component.ts',
        };
    }
}
