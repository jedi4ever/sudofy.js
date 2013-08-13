# Description

This library allows you to generate you a sudo command with all the correct escapes and flags.

# Usage
## Simple usage
    var sudofy = require('sudofy');
    sudofy.command('who am i');

## Specify options
    var sudofy = require('sudofy');
    var options= { group: 'wheel', user: 'root', interactive: false };
    sudofy.command('who am i', options);

# Available options

`user`: **string** user to sudo to (defaults to root)
`group`: **string** group to sudo to (defaults to null)
`password`: **string** specify password to pass to sudo (default to null)
`preserveEnv`: **boolean** preserves the Environment (defaults to false)
`preserveGroup`: **boolean** preserves the Group of the sudo invoker (defaults to false)
`interactive`: **boolean** run interactively (default to false)
`root`: **boolean** indicate we are already root (defaults to false)
`login`: **bolean** simulate initial login (defaults to false)
`shell`: **string** specify shell when login is specified (defaults to null)
`args`: **array** of flags/options to pass to the sudo command (default to [])

# License
MIT
