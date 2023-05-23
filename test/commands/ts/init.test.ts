import { expect, test } from '@oclif/test';

describe('ts init', () => {
    test.stdout()
        .command(['ts init'])
        .it('runs hello', (ctx) => {
            expect(ctx.stdout).to.contain('hello world');
        });

    test.stdout()
        .command(['ts init', '--name', 'Astro'])
        .it('runs hello --name Astro', (ctx) => {
            expect(ctx.stdout).to.contain('hello Astro');
        });
});
