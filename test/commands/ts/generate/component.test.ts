import { expect, test } from '@oclif/test';

describe('ts generate component', () => {
    test.stdout()
        .command(['ts generate component'])
        .it('runs hello', (ctx) => {
            expect(ctx.stdout).to.contain('hello world');
        });

    test.stdout()
        .command(['ts generate component', '--name', 'Astro'])
        .it('runs hello --name Astro', (ctx) => {
            expect(ctx.stdout).to.contain('hello Astro');
        });
});
