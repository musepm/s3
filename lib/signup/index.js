'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

function go() {
  var su, prompts, info, main, aws;
  return _regeneratorRuntime.async(function go$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:

        prompt.message = '>'.green;
        prompt.start();

        su = '\n\n---------------------------------------------------------------\n\nEnter your app/acctid and AWS access id/secret credentials below.\n\n';

        console.log(su);
        prompts = [];

        prompts.push('accountid', 'appid', 'id', 'secret');
        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(promptGet(prompts));

      case 9:
        info = context$1$0.sent;
        main = { accountid: info.accountid,
          appid: info.appid };
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(credentials.newCredentials(main));

      case 13:
        aws = { id: info.id, secret: info.secret };
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(credentials.newCredentials(aws));

      case 16:
        context$1$0.next = 21;
        break;

      case 18:
        context$1$0.prev = 18;
        context$1$0.t0 = context$1$0['catch'](6);

        console.error(context$1$0.t0);

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 18]]);
}

try {
  go().then(function (r) {
    console.log('Done.');
  });
} catch (e) {
  console.error(e);
}