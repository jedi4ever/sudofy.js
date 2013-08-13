'use strict';

var quote = require('shell-quote').quote;
var hashmerge = require('hashmerge');

var sudoCommand = function(command ,options) {

  var defaults = {
    user: 'root',        // user to sudo to
    group: null,         // group to sudo to
    password: null,      // password to pass
    preserveEnv: false,  // preserve Environment
    preserveGroup: false,// preserve invoking user's group unaltered
    root: false,         // execute sudo as root
    interactive: true,   // execute interactively
    login: false,        // simulate initial login
    shell: null,         // shell to execute
    args: []             // specify additional args to the sudo command
  };

  var settings = hashmerge(defaults,options);

  // Check for the preserve flag
  var flags = [];
  if (settings.preserveEnv) {
    flags.push('-E');
  }

  // Check if we need to handle password or not
  var passwordString = '';
  if (settings.password) {
    passwordString = 'echo '+ quote([settings.password])+ ' | ';
    flags.push('-S');
  }

  // Set the user if it's not root
  if (settings.user) {
    if (settings.user !== 'root') {
      flags.push('-u ' + quote([settings.user]));
    }
  }

  // Set the group if it's specified
  if (settings.group) {
      flags.push('-g ' + quote([settings.group]));
  }


  // Set the interactive if it's specified
  if (settings.interactive === false ) {
      flags.push('-n');
  }

  // Set the preserveGroup if it's specified
  if (settings.preserveGroup) {
      flags.push('-P');
  }

  //
  if (settings.args) {
    settings.args.forEach(function(flag) {
      flags.push(flag);
    });
  }

  // Set the initial login if it's specified
  if (settings.login) {
    if (settings.shell) {
      flags.push('-i ' + quote([settings.shell]));
    } else {
      flags.push('-i');
    }
  }

  var flagsString = '' ;
  if (flags.length > 0 ) {
    flagsString = flags.join(' ') +  ' ';
  }

  // Check if we are root or not
  if (settings.root) {
    return command;
  } else {
    return passwordString + 'sudo ' + flagsString + quote([command]);
  }

};

module.exports = { command: sudoCommand};
