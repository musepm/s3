'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var credentials = require('musepm-credentials'),
    AWS = require('aws-sdk');
var l = console.log;
module.exports = {
      signon: function signon(cfg) {
            var main, creds, monitor, cls, bucket;
            return _regeneratorRuntime.async(function signon$(context$1$0) {
                  while (1) switch (context$1$0.prev = context$1$0.next) {
                        case 0:
                              context$1$0.prev = 0;

                              l(1);
                              AWS.config.region = cfg.region;
                              context$1$0.next = 5;
                              return _regeneratorRuntime.awrap(credentials.getAll('main'));

                        case 5:
                              main = context$1$0.sent;

                              l(2);
                              context$1$0.next = 9;
                              return _regeneratorRuntime.awrap(credentials.getAll('aws'));

                        case 9:
                              creds = context$1$0.sent;

                              AWS.config.accessKeyId = creds.id;
                              AWS.config.secretAccessKey = creds.secret;
                              l(4);
                              monitor = require('musepm-monitor')(main.accountid, cfg.appid);
                              cls = AWS.S3.prototype;

                              cls.createBucket = monitor.logCalls('s3', 'createBucket', cls.createBucket);
                              cls.upload = monitor.logCalls('s3', 'upload', cls.upload);
                              l(5);

                              bucket = new AWS.S3({ params: { Bucket: cfg.bucket } });
                              context$1$0.next = 24;
                              break;

                        case 21:
                              context$1$0.prev = 21;
                              context$1$0.t0 = context$1$0['catch'](0);

                              console.error(context$1$0.t0);

                        case 24:
                              return context$1$0.abrupt('return', bucket);

                        case 25:
                        case 'end':
                              return context$1$0.stop();
                  }
            }, null, this, [[0, 21]]);
      }
};