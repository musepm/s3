'use strict';

var cfg = { region: 'us-west-2', appid: 'myapp02', bucket: 'myuniqueid' };
require('musepm').signon('s3', cfg).then(function (bucket) {
  bucket.createBucket(function () {
    var params = { Key: 'myKey', Body: 'Hello!' };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('Error uploading data: ', err);
      } else {
        console.log('Successfully uploaded.');
      }
    });
  });
})['catch'](function (e) {
  console.error(e);
});