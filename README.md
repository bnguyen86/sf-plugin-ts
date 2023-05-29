# lwc-ts

[![NPM](https://img.shields.io/npm/v/lwc-ts.svg?label=lwc-ts)](https://www.npmjs.com/package/lwc-ts) [![Downloads/week](https://img.shields.io/npm/dw/lwc-ts.svg)](https://npmjs.org/package/lwc-ts) [![License](https://img.shields.io/badge/License-BSD%203--Clause-brightgreen.svg)](https://raw.githubusercontent.com/salesforcecli/lwc-ts/main/LICENSE.txt)

## Using the template

This repository provides a template for creating a plugin for the Salesforce CLI. To convert this template to a working plugin:

1. Please get in touch with the Platform CLI team. We want to help you develop your plugin.
2. Generate your plugin:

    ```
    sf plugins install dev
    sf dev generate plugin

    git init -b main
    git add . && git commit -m "chore: initial commit"
    ```

3. Create your plugin's repo in the salesforcecli github org
4. When you're ready, replace the contents of this README with the information you want.

## Learn about `sf` plugins

Salesforce CLI plugins are based on the [oclif plugin framework](<(https://oclif.io/docs/introduction.html)>). Read the [plugin developer guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_architecture_sf_cli.htm) to learn about Salesforce CLI plugin development.

This repository contains a lot of additional scripts and tools to help with general Salesforce node development and enforce coding standards. You should familiarize yourself with some of the [node developer packages](#tooling) used by Salesforce.

Additionally, there are some additional tests that the Salesforce CLI will enforce if this plugin is ever bundled with the CLI. These test are included by default under the `posttest` script and it is required to keep these tests active in your plugin if you plan to have it bundled.

### Tooling

-   [@salesforce/core](https://github.com/forcedotcom/sfdx-core)
-   [@salesforce/kit](https://github.com/forcedotcom/kit)
-   [@salesforce/sf-plugins-core](https://github.com/salesforcecli/sf-plugins-core)
-   [@salesforce/ts-types](https://github.com/forcedotcom/ts-types)
-   [@salesforce/ts-sinon](https://github.com/forcedotcom/ts-sinon)
-   [@salesforce/dev-config](https://github.com/forcedotcom/dev-config)
-   [@salesforce/dev-scripts](https://github.com/forcedotcom/dev-scripts)

### Hooks

For cross clouds commands, e.g. `sf env list`, we utilize [oclif hooks](https://oclif.io/docs/hooks) to get the relevant information from installed plugins.

This plugin includes sample hooks in the [src/hooks directory](src/hooks). You'll just need to add the appropriate logic. You can also delete any of the hooks if they aren't required for your plugin.

# Everything past here is only a suggestion as to what should be in your specific plugin's description

This plugin is bundled with the [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli). For more information on the CLI, read the [getting started guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm).

We always recommend using the latest version of these commands bundled with the CLI, however, you can install a specific version or tag if needed.

## Install

```bash
sf plugins install lwc-ts@x.y.z
```

## Issues

Please report any issues at https://github.com/forcedotcom/cli/issues

## Contributing

1. Please read our [Code of Conduct](CODE_OF_CONDUCT.md)
2. Create a new issue before starting your project so that we can keep track of
   what you are trying to add/fix. That way, we can also offer suggestions or
   let you know if there is already an effort in progress.
3. Fork this repository.
4. [Build the plugin locally](#build)
5. Create a _topic_ branch in your fork. Note, this step is recommended but technically not required if contributing using a fork.
6. Edit the code in your fork.
7. Write appropriate tests for your changes. Try to achieve at least 95% code coverage on any new code. No pull request will be accepted without unit tests.
8. Sign CLA (see [CLA](#cla) below).
9. Send us a pull request when you are done. We'll review your code, suggest any needed changes, and merge it in.

### CLA

External contributors will be required to sign a Contributor's License
Agreement. You can do so by going to https://cla.salesforce.com/sign-cla.

### Build

To build the plugin locally, make sure to have yarn installed and run the following commands:

```bash
# Clone the repository
git clone git@github.com:salesforcecli/lwc-ts

# Install the dependencies and compile
yarn && yarn build
```

To use your plugin, run using the local `./bin/dev` or `./bin/dev.cmd` file.

```bash
# Run using local run file.
./bin/dev hello world
```

There should be no differences when running via the Salesforce CLI or using the local run file. However, it can be useful to link the plugin to do some additional testing or run your commands from anywhere on your machine.

```bash
# Link your plugin to the sf cli
sf plugins link .
# To verify
sf plugins
```

## Commands

<!-- commands -->

-   [`sf hello world`](#sf-hello-world)
-   [`sf ts convert`](#sf-ts-convert)
-   [`sf ts generate component`](#sf-ts-generate-component)
-   [`sf ts init`](#sf-ts-init)

## `sf hello world`

Say hello.

```
USAGE
  $ sf hello world [--json] [-n <value>]

FLAGS
  -n, --name=<value>  [default: World] The name of the person you'd like to say hello to.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Say hello.

  Say hello either to the world or someone you know.

EXAMPLES
  Say hello to the world:

    $ sf hello world

  Say hello to someone you know:

    $ sf hello world --name Astro
```

## `sf ts convert`

Convert existing LWC components to TypeScript.

```
USAGE
  $ sf ts convert [--json] [-a] [-p <value>]

FLAGS
  -a, --convert-all-lwc  Boolean flag, will convert all LWC components in the project. Either this flag or the --path
                         flag must be provided.
  -p, --path=<value>     Path to folder with LWC components to be converted. This will convert all .js files in the path
                         folders and subfolders. Can also be used if your components are not in the default LWC folder.
                         Either this flag or the --convert-all-lwc flag must be provided.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Convert existing LWC components to TypeScript.

  Convert all JS files in your default LWC folder to TS. Or specify a path and only convert JS files in that path to
  TS. This will not change or remove any existing JS or TS files.

EXAMPLES
  Convert all LWC components in your project

    $ sf ts convert --convert-all-lwc
    $ sf ts convert -a

  Convert a specific component

    $ sf ts convert --path force-app/main/default/lwc/myComponent
    $ sf ts convert -p force-app/main/default/lwc/myComponent
```

## `sf ts generate component`

Generate a new LWC component and corresponding .ts files.

```
USAGE
  $ sf ts generate component -n <value> [--json] [-d <value>] [-t default|analyticsDashboard|analyticsDashboardWithStep]
    [--api-version <value>]

FLAGS
  -d, --output-dir=<value>  Directory for saving the created files.
  -n, --name=<value>        (required) Name of the generated Lightning Component.
  -t, --template=<option>   Template to use for file creation.
                            <options: default|analyticsDashboard|analyticsDashboardWithStep>
  --api-version=<value>     Override the api version used for api requests made by this command

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Generate a new LWC component and corresponding .ts files.

  Uses `sf lightning generate component` to create a new components and creates corresponding .ts file. Passes `--type
  lwc` flag.

EXAMPLES
  Generate the metadata files for an LWC component bundle in the default directory

    $ sf ts generate component --name mycomponent

FLAG DESCRIPTIONS
  -d, --output-dir=<value>  Directory for saving the created files.

    The location can be an absolute path or relative to the current working directory. The default is the default LWC
    directory.

  -n, --name=<value>  Name of the generated Lightning Component.

    The name can be up to 40 characters and must start with a letter.

  -t, --template=default|analyticsDashboard|analyticsDashboardWithStep  Template to use for file creation.

    Supplied parameter values or default values are filled into a copy of the template.
```

## `sf ts init`

Initialize your project for use with TypeScript

```
USAGE
  $ sf ts init [--json] [-t <value>] [-l <value>] [-a]

FLAGS
  -a, --convert-all-lwc     If true, then all LWC components will be converted to .ts
  -l, --lwc-target=<value>  [default: ./force-app/main/default/lwc] Target path of all LWC components.
  -t, --target=<value>      [default: ./] Target folder of your project.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Initialize your project for use with TypeScript

  Installs the dependencies needed to start using TypeScript in your project. Including updating your .forceIgnore,
  creating a tsconfig file and adding some types needed for transpiling your .ts files.

EXAMPLES
  $ sf ts init

FLAG DESCRIPTIONS
  -a, --convert-all-lwc  If true, then all LWC components will be converted to .ts

    All components in the default LWC folder will be converted to .ts. If `--lwc-target` is also provided, then only .js
    files in that folder will be converted. Conversion process does not alter your current .js files.

  -l, --lwc-target=<value>  Target path of all LWC components.

    Path to your LWC components. A folder for TS types will be created here.

  -t, --target=<value>  Target folder of your project.

    The path to the root of your project. It should be the folder where the `package.json` and `.forceignore` are
    located. Not needed if run from the root of your project.
```

<!-- commandsstop -->
