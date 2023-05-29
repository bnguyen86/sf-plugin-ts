# summary

Initialize your project for use with TypeScript

# description

Installs the dependencies needed to start using TypeScript in your project. Including updating your .forceIgnore, creating a tsconfig file and adding some types needed for transpiling your .ts files.

# flags.target.summary

Target folder of your project.

# flags.target.description

The path to the root of your project. It should be the folder where the `package.json` and `.forceignore` are located. Not needed if run from the root of your project.

# flags.lwcTarget.summary

Target path of all LWC components.

# flags.lwcTarget.description

Path to your LWC components. A folder for TS types will be created here.

# flags.convertAll.summary

If true, then all LWC components will be converted to .ts

# flags.convertAll.description

All components in the default LWC folder will be converted to .ts. If `--lwc-target` is also provided, then only .js files in that folder will be converted. Conversion process does not alter your current .js files.

# examples

-   <%= config.bin %> <%= command.id %>

# steps.installingTs

Installing TS packages

# steps.updatingForceignore

Updating .forceIgnore

# steps.createTsConfig

Creating tsconfig.json

# steps.createTsTypes

Creating TS types

# steps.convertLwc

Converting all existing LWC components to .ts

# steps.addingScripts

Adding scripts to package.json

# error.forceIgnoreNotFound

.forceIgnore not found, please run this command from your project root directory, or create a .forceIgnore file in your target directory.
