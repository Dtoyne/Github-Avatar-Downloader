var request = require('request');
var GITHUB_USER = "Dtoyne";
var GITHUB_TOKEN = "4e8b9e4d4dc8bb62ddce6b9d27e6c10d2c9c12fa";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + GITHUB_USER + '/' + "github-avatar-downloader" + '/contributors';
  console.log(requestURL);
}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors();


// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });
