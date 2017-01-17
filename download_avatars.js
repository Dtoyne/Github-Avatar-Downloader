// console.log('Welcome to the GitHub Avatar Downloader!');

var request = require('request');
var fs = require('fs');
var https = require('https');
var GITHUB_USER = "Dtoyne";
var GITHUB_TOKEN = "4e8b9e4d4dc8bb62ddce6b9d27e6c10d2c9c12fa";
var owner = process.argv[2];
var repo = process.argv[3];

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

getRepoContributors(owner, repo, function(err, result) {
  if (err) {
    console.log("Errors:", err);
    return err;
  }
  for (var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, "./avatars/" + result[i].login + ".jpg")
  }
});

function downloadImageByURL(url, filepath) {
  request.get(url, function(response) {
  })
  .pipe(fs.createWriteStream(filepath));
}
