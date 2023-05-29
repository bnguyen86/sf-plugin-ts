# summary

Convert existing LWC components to TypeScript.

# description

Convert all JS files in your default LWC folder to TS. Or specify a path and only convert JS files in that path to TS. This will not change or remove any existing JS or TS files.

# flags.all.summary

Boolean flag, will convert all LWC components in the project. Either this flag or the --path flag must be provided.

# flags.path.summary

Path to folder with LWC components to be converted. This will convert all .js files in the path folders and subfolders. Can also be used if your components are not in the default LWC folder. Either this flag or the --convert-all-lwc flag must be provided.

# examples

-   Convert all LWC components in your project
    <%= config.bin %> <%= command.id %> --convert-all-lwc
    <%= config.bin %> <%= command.id %> -a

-   Convert a specific component
    <%= config.bin %> <%= command.id %> --path force-app/main/default/lwc/myComponent
    <%= config.bin %> <%= command.id %> -p force-app/main/default/lwc/myComponent

# error.convertPathRequired

--convert-all-lwc or --path flag is required

# error.convertPathRequired.actions

Please use the --convert-all-lwc or -a flag to convert all your LWC components, or provide a specific path using --path or -p
