var Firebase = require('firebase');

var firebaseUrl = process.env.FIREBASE_URL;

var answersRef= new Firebase(firebaseUrl + 'answers');
var questionsRef= new Firebase(firebaseUrl + 'questions');

answersRef.limitToLast(1).on('value', function(snap){
  snap.forEach(function(ans){
    if ( ans.val().verified === 0 ) {
      var question = ans.val().question;

      questionsRef.child(question).on('value', function(ques){
        var expected = ques.val().expected;
        var evaluated = String(eval(ans.val().body));
        if ( expected === evaluated ) {
          answersRef.child(ans.key()).update({
            'verified':1
          }, function(err){
            if (err) console.log(err);
            process.exit(0);
          });
        }
      });

    }
  });
});

setTimeout(function(){
  console.log("It's time to sleep!");
  process.exit(0);
}, 2000);
