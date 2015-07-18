require('shelljs/global');

let prompt = require('prompt'),
    pr = require('es6-promisify'),
    promptGet = pr(prompt.get),
    credentials = require('musepm-credentials');

async function go() {

  var email = '';

  prompt.message = '>'.green;
  prompt.start();
 
  let su = `

---------------------------------------------------------------

Do you have a Slack account?

`
  console.log(su);

  try {
    var answer = await promptGet(['yn']);
  } catch(e) {
    console.error(e);
  }
  if (answer.yn == 'n') {
    try {
      var ans2 = await promptGet(['Email', 'Company']);
    } catch (e2) {
      console.log(e2); 
    }
    email = ans2.Email;
    let x = await new Promise( (res) => {
     exec(`casperjs ${__dirname}/newacct.js ${email} ${ans2.Company}`, (code, o) => { 
       res();
     });
   });
    
   console.log(` 
   Please click the button in the email from Slack
   and fill out the form in the browser to create 
   a Slack team. Then return to this terminal window.
   `); 
  }

  if (email == '') { 
    var prompts = ['email'];
  } else {
    var prompts = [];
  }
  prompts.push('teamdomain', 'password', 'botname');
  let info = await promptGet(prompts);
  if (info.email) email = info.email;
  let n = await new Promise( (res) => {
    let opts = {async:true, silent:false};
    exec(`casperjs ${__dirname}/newbot.js ${info.teamdomain} ${email} ${info.password} ${info.botname}`, opts, (code, o) => {
      var token = o.split('|')[1];
      var slack = { slack: { } };
      slack.slack[info.botname] = token;
      credentials.newCredentials(slack);
      res();
    });
  });
}

try {
  go().then(r => {
    console.log('Done');
  });
} catch(e) {
  console.error(e);
}
