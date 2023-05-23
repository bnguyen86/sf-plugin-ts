# summary

Generate a new LWC component and corresponding .ts files.

# description

Uses `sf lightning generate component` to create a new components and creates corresponding .ts file. Passes `--type lwc` flag.

# flags.name.summary

Name of the generated Lightning Component.

# flags.name.description

The name can be up to 40 characters and must start with a letter.

# flags.output.summary

Directory for saving the created files.

# flags.output.description

The location can be an absolute path or relative to the current working directory. The default is the default LWC directory.

# flags.template.summary

Template to use for file creation.

# flags.template.description

Supplied parameter values or default values are filled into a copy of the template.

# flags.api.summary

Override the api version used for api requests made by this command

# examples

-   Generate the metadata files for an LWC component bundle in the default directory
    <%= config.bin %> <%= command.id %> --name mycomponent
