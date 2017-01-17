console.log('Welcome to the GitHub Avatar Downloader!');

const request = require("request");
const fs = require("fs");
const https = require("https");
const GITHUB_USER = "Dtoyne";
const GITHUB_TOKEN = "4e8b9e4d4dc8bb62ddce6b9d27e6c10d2c9c12fa";
const owner = process.argv[2];
const repo = process.argv[3];
const folder = './avatars/';

// Based on the command-line input, get the list of contributors from the GitHub API:

function getRepoContributors (repoOwner, repoName, cb) {
  let requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let https = require("https");
  let fs = require("fs");
  let options = {
    "url": requestURL,
    "headers": {
      "User-Agent": 'request'}
    };

    if (repo === undefined) {
      throw "You need to input some arguments";
    }   else if (process.argv.length > 4) {
      throw "You put in too many arguments";
    }

    request.get(options, (error, response, body) => {
      if (error) {
        return error;
      }
      if (response.statusCode === 200) {
        let data = JSON.parse(body);
        cb(null, data);
      }
    });
  }

  // Loop through the contributors and download their respective avatars:

  getRepoContributors(owner, repo, (err, result) => {
    if (err) {
      console.log("Errors:", err);
      return err;
    }
    for (let i = 0; i < result.length; i++) {
      downloadImageByURL(result[i].avatar_url, `./avatars/${result[i].login}.jpg`);
    }
  });

  // Pipe the .jpg's into the avatars folder in the directory || create new folder if it does not already exist:

  function downloadImageByURL(url, filePath) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    request(url).pipe(fs.createWriteStream(filePath));
  }
