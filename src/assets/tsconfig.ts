export const tsconfig = {
    'ts-node': {
        files: true,
    },
    compilerOptions: {
        rootDir: './',
        strict: true,
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        module: 'ESNext',
        noImplicitAny: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        target: 'ESNext',
        isolatedModules: true,
        skipLibCheck: true,
        baseUrl: '.',
        esModuleInterop: true,
        types: ['node', '@types/jest'],
        paths: {},
    },
    include: ['force-app/main/default/lwc', '.sfdx/typings/lwc/*'],
    exclude: ['/__tests__/', '/node_modules/', '/target/', '/dist/', '/build/'],
};
