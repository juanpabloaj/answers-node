exports = module.exports = {};

var gen_script_name = function(lang){
  var script_name = 'script';
  if ( lang === 'python2.7') {
    script_name = script_name + '.py';
  }
  if ( lang === 'javascript') {
    script_name = script_name + '.js';
  }
  return(script_name);
};
exports.gen_script_name = gen_script_name;

exports.gen_exec_command= function(lang){
  var exec_command = gen_script_name(lang);
  if ( lang === 'python2.7') {
    exec_command = 'python2.7 ' + exec_command;
  }
  if ( lang === 'javascript' ) {
    exec_command = 'node ' + exec_command;
  }
  return(exec_command);
};