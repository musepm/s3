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
  let prompts = [];
  prompts.push('accountid', 'appid', 'id', 'secret');
  try {
    let info = await promptGet(prompts);
    let main = {main:{ accountid: info.accountid, 
                 appid: info.appid }};
    await credentials.newCredentials(main);
    let aws = {aws:{ id: info.id, secret: info.secret }};
    await credentials.newCredentials(aws);  
  } catch (e) {
    console.error(e);
  }
}

try {
  go().then(r => {
    console.log('Done.');
  });
} catch(e) {
  console.error(e);
}
