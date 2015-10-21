var assert = require('assert');
var utils = require('../lib/utils');

describe('utils', function(){
  describe('gen_script_name', function(){
    it('python2.7 return script.py', function(){
      assert.equal('script.py', utils.gen_script_name('python2.7'));
    });

    it('python3.4 return script.py', function(){
      assert.equal('script.py', utils.gen_script_name('python3.4'));
    });

    it('javascript return node', function(){
      assert.equal('script.js', utils.gen_script_name('javascript'));
    });

    it('elixir return script.ex', function(){
      assert.equal('script.ex', utils.gen_script_name('elixir'));
    });
  });
  describe('gen_exec_command', function(){
    it('python2.7 return python2.7 script.py', function(){
      assert.equal('python2.7 script.py', utils.gen_exec_command('python2.7'));
    });

    it('python3.4 return python3.4 script.py', function(){
      assert.equal('python3.4 script.py', utils.gen_exec_command('python3.4'));
    });

    it('javascript return node script.js', function(){
      assert.equal('node script.js', utils.gen_exec_command('javascript'));
    });

    it('elixir return elixir script.ex', function(){
      assert.equal('elixir script.ex', utils.gen_exec_command('elixir'));
    });
  });
});
