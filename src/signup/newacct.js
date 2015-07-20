var casper = require('casper').create();
var args = casper.cli.args;

casper.start('https://slack.com/', function() {
  var args = casper.cli.args;
  this.capture('img3.png');
  console.log(args);

  this.fillSelectors(".signup_form",{
     'input[name=email]' : args[0],
     'input[name=company]' : args[1],
     'input[name=done1]': 1,
     'input[name=ref]': ''
  }, true);

  /*
  this.fill(".signup_form",{
     'email' : args[0],
     'company' : args[1],
     'done1': 1,
     'ref': ''
  }); */

 // this.click('input[type=submit]');
  
});

casper.wait(1000, function() {
  this.echo('waited');
});

casper.then(function() {
  this.capture('img4.png'); 
});

casper.run();


