var test = require('tape');
var requireomat = require('./index');

test('should dryrun and then call callback', function(t){
  t.plan(2);
  requireomat({
    dryrun: true
  }, function(err, result){
    t.false(err);
    t.true(result);
  });

});
