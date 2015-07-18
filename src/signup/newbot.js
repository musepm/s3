var casper = require('casper').create();

var args = casper.cli.args;

var info = {
  teamdomain: args[0],
  email: args[1],
  password: args[2],
  botname: args[3] 
};

console.log(JSON.stringify(info));

casper.start('https://'+info.teamdomain+'.slack.com/', function() {
  var args = casper.cli.args;
  this.fill('form#signin_form', {
          'email':    info.email,
          'password': info.password,
          'signin': 1,
          'redir': ''
       }, true);
});

casper.then(function() {
  this.echo('Logging in...');
  this.wait(3600, function() {
    this.echo('OK.');
  });
});

casper.thenOpen('https://my.slack.com/services/new/bot', function() {
  this.capture('newbot.png');
  this.fill('form#service_config', {
    'bot_name': info.botname,
    'add_service': 1
  }, true);
});

casper.then(function() {
  this.wait(1000, function() {
    this.echo('Created bot.'); 
  });
});

casper.then(function() {
  this.capture('addedbot.png');
  var token = this.getElementAttribute('#small_input','value');
  this.echo('Saving token |' + token+'|');
});
                                           
casper.run();

