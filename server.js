var Firebase = require('firebase');
var exec = require('child_process').exec;
var fs = require('fs');

var utils = require('./lib/utils');

var firebaseUrl = process.env.FIREBASE_URL;
var firebaseSecret = process.env.FIREBASE_SECRET;

var answersRef= new Firebase(firebaseUrl + 'answers');
var questionsRef= new Firebase(firebaseUrl + 'questions');

answersRef.authWithCustomToken(firebaseSecret, function(err, result){

  answersRef.limitToLast(1).on('value', function(snap){
    snap.forEach(function(ans){
      if ( ans.val().state === 'waiting' ) {
        console.log('Processing answers ' + ans.key());
        var question = ans.val().question;

        questionsRef.child(question).on('value', function(ques){
          var expected = ques.val().expected;
          var question_input = ques.val().input;
          var code = ans.val().code;

          var language = ques.val().language;

          var script_name = utils.gen_script_name(language);
          var exec_cmd = utils.gen_exec_command(language);

          var script_content = question_input + ';\n' + code;
          fs.writeFileSync(script_name, script_content);

          exec(exec_cmd, function(error, stdout, stderr){
            stdout = stdout.replace(/\n$/, "");

            if ( error !== null ) {
              console.log('exec error: ', error);
            }

            var state = 'failed';
            if ( expected === stdout ) {
              state = 'passed';
            }

            answersRef.child(ans.key()).update({
              'state':state,
              'output': stdout,
              'error': stderr
            }, function(err){
              if (err) console.log(err);
              process.exit(0);
            });
          });

        });

      }
    });
  });

});

setTimeout(function(){
  console.log("It's time to sleep!");
  process.exit(0);
}, 4000);
