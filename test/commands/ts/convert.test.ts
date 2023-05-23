import { expect, test } from '@oclif/test';

describe('ts convert', () => {
    test.stdout()
        .command(['ts convert'])
        .it('runs hello', (ctx) => {
            expect(ctx.stdout).to.contain('hello world');
        });

    test.stdout()
        .command(['ts convert', '--name', 'Astro'])
        .it('runs hello --name Astro', (ctx) => {
            expect(ctx.stdout).to.contain('hello Astro');
        });
});
