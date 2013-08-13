//'use strict';

var expect = require('chai').expect;
var sudo = require('../lib/sudofy');

describe('SudoCommand', function() {

  it('should escape a command with spaces', function(done) {
    var result = sudo.command('who am i');
    expect(result).to.be.string('sudo \'who am i\'');
    done();
  });

  it('should not escape a command without spaces', function(done) {
    var result = sudo.command('pwd');
    expect(result).to.be.string('sudo pwd');
    done();
  });

  it('should activate preserve environment', function(done) {
    var result = sudo.command('who am i', { preserveEnv: true});
    expect(result).to.be.string('sudo -E \'who am i\'');
    done();
  });

  it('should not sudo if root', function(done) {
    var result = sudo.command('who am i', { root:true, preserve: true});
    expect(result).to.be.string('who am i');
    done();
  });

  it('should pass the password over stdin', function(done) {
    var result = sudo.command('who am i', { password: 'testme'});
    expect(result).to.be.string('echo testme | sudo -S \'who am i\'');
    done();
  });

  it('should pass the password over stdin and escape it', function(done) {
    var result = sudo.command('who am i', { password: 'test me'});
    expect(result).to.be.string('echo \'test me\' | sudo -S \'who am i\'');
    done();
  });

  it('should set the correct user if specified', function(done) {
    var result = sudo.command('who am i', { user: 'ubuntu'});
    expect(result).to.be.string('sudo -u ubuntu \'who am i\'');
    done();
  });

  it('should set the correct group if specified', function(done) {
    var result = sudo.command('who am i', { group: 'wheel'});
    expect(result).to.be.string('sudo -g wheel \'who am i\'');
    done();
  });

  it('should set the non interactive if specified', function(done) {
    var result = sudo.command('who am i', { interactive: false});
    expect(result).to.be.string('sudo -n \'who am i\'');
    done();
  });

  it('should set the initial login if specified', function(done) {
    var result = sudo.command('who am i', { login: true});
    expect(result).to.be.string('sudo -i \'who am i\'');
    done();
  });

  it('should set the initial login with the correct shell if specified', function(done) {
    var result = sudo.command('who am i', { login: true , shell: '/bin/sh'});
    expect(result).to.be.string('sudo -i /bin/sh \'who am i\'');
    done();
  });

  it('should set preserve the group if specified', function(done) {
    var result = sudo.command('who am i', { preserveGroup: true});
    expect(result).to.be.string('sudo -P \'who am i\'');
    done();
  });

  it('should take other args if specified', function(done) {
    var result = sudo.command('who am i', { args: ['-k']});
    expect(result).to.be.string('sudo -k \'who am i\'');
    done();
  });
});
