require('musepm').signon('slack','hibot2')
.then( function(slack) {
  slack.on('open', function() {
    var channel = slack.getChannelByName('general');
    channel.send('Testing abc');
   });
 });