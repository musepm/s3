let prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

async f => {
  let su = `

---------------------------------------------------------------

Please visit https://slack.com to sign up.
After signing up, click the activation link in the email.
Follow the instructions to create a team.

Then create a new bot integration at https://my.slack.com/services/new/bot

Copy and paste your token below:
`
  console.log(su);

  prompt.message = '>'.green;
  prompt.start();
 
  let results = await promptGet(['Bot name', 'Token']);
  let data = {  'slack': {}};
  data.slack[results['Bot name']] = results.Token;
  await credentials.newCredentials(data);
}();

