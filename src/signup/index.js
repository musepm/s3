let prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

async function go() {

  prompt.message = '>'.green;
  prompt.start();
 
  let su = `

---------------------------------------------------------------

Enter your app/acctid and AWS access id/secret credentials below.

`
  console.log(su);

  prompts.push('accountid', 'appid', 'id', 'secret');
  let info = await promptGet(prompts);
  let main = { accountid: info.accountid, 
               appid: info.appid };
  credentials.newCredentials(main);
  let aws = { id: info.id, secret: info.secret };
  credentials.newCredentials(aws);  
}

try {
  go().then(r => {
    console.log('Done.');
  });
} catch(e) {
  console.error(e);
}
