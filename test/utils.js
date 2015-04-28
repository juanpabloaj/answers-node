var assert = require('assert');
var utils = require('../lib/utils');

describe('utils', function(){
  describe('gen_script_name', function(){
    it('python2.7 return python2.7', function(){
      assert.equal('script.py', utils.gen_script_name('python2.7'));
    });
    it('javascript return node', function(){
      assert.equal('script.js', utils.gen_script_name('javascript'));
    });
  });
  describe('gen_exec_command', function(){
    it('python2.7 return python script.py', function(){
      assert.equal('python2.7 script.py', utils.gen_exec_command('python2.7'));
    });
    it('javascript return node script.js', function(){
      assert.equal('node script.js', utils.gen_exec_command('javascript'));
    });
  });
});
