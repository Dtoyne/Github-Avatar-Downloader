// console.log('Welcome to the GitHub Avatar Downloader!');

var request = require('request');
var fs = require('fs');
var https = require('https');
var GITHUB_USER = "Dtoyne";
var GITHUB_TOKEN = "4e8b9e4d4dc8bb62ddce6b9d27e6c10d2c9c12fa";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = ('https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors')
  var https = require("https");
  var fs = require("fs");
  var options = {
    url: requestURL,
    headers: {
    'User-Agent': 'request'
  }
};

  request.get(options, function(error, response, body) {
    if (error) {
      return error;
    }
    if (response.statusCode === 200) {
      var data = JSON.parse(body);
      cb(null, data);
    }
  });
};

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) {
    console.log("Errors:", err);
    return err;
  }

  for (var i = 0; i < result.length; i++) {
    console.log(result[i].avatar_url);
  }
});

function downloadImageByURL(url, filepath) {
  request.get(url, function(response) {
  })
  .pipe(fs.createWriteStream(filepath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
