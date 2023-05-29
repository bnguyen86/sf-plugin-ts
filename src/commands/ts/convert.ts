import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';

import { convertLwcDirectory } from '../../modules/convertJsTs';

import type { ConversionResult } from '../../modules/convertJsTs';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('lwc-ts', 'ts.convert');

const DEFAULT_LWC_PATH = './force-app/main/default/lwc';

export type TsConvertResult = {
    results?: ConversionResult[];
};

export default class TsConvert extends SfCommand<TsConvertResult> {
    public static readonly summary = messages.getMessage('summary');
    public static readonly description = messages.getMessage('description');
    public static readonly examples = messages.getMessages('examples');

    public static readonly flags = {
        'convert-all-lwc': Flags.boolean({
            summary: messages.getMessage('flags.all.summary'),
            char: 'a',
            required: false,
        }),
        path: Flags.string({
            summary: messages.getMessage('flags.path.summary'),
            char: 'p',
            required: false,
        }),
    };

    public async run(): Promise<TsConvertResult> {
        const { flags } = await this.parse(TsConvert);

        // const name = flags.name ?? 'world';
        // this.log(`hello ${name} from /Users/bnguyen/Workspace/lwc-ts/src/commands/ts/convert.ts`);
        const convertAll = flags['convert-all-lwc'];
        const path = flags.path ?? '';

        if (!convertAll && !path) {
            throw messages.createError('error.convertPathRequired');
        }
        const results = await convertLwcDirectory(convertAll ? DEFAULT_LWC_PATH : path);
        return {
            results,
        };
    }
}
