var credentials = require('musepm-credentials'),
    AWS = require('aws-sdk');
var l = console.log;
module.exports = {
  async signon(cfg) {
    try {
l(1)
      AWS.config.region = cfg.region;
      var main = await credentials.getAll('main');
l(2)
      var creds = await credentials.getAll('aws');
      AWS.config.accessKeyId = creds.id;
      AWS.config.secretAccessKey = creds.secret;
l(4)
      var monitor = require('musepm-monitor')(main.accountid, cfg.appid);
      var cls = AWS.S3.prototype;
      cls.createBucket = monitor.logCalls('s3','createBucket', cls.createBucket);
      cls.upload = monitor.logCalls('s3', 'upload', cls.upload);
l(5)
      var s3 = new AWS.S3();
    } catch (e) {
      console.error(e);
    }
    return s3;
  }
}


