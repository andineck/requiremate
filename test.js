var test = require('tape');
var requiremate = require('./index');

test('should dryrun and then call callback', function(t){
  t.plan(2);
  requiremate({
    dryrun: true
  }, function(err, result){
    t.false(err);
    t.true(result);
  });

});
