console.log('Welcome to the GitHub Avatar Downloader!');
require("dotenv").config();
const request = require("request");
const fs = require("fs");
const https = require("https");
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const owner = process.argv[2];
const repo = process.argv[3];
const folder = './avatars/';

// Based on the command-line input(owner, repo), get the list of contributors from the GitHub API:

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
        throw error;
      }
      if (response.statusCode === 200) {
        let data = JSON.parse(body);
        cb(data);
      }
    });
  }

  // Loop through the contributors and download their respective avatars:

  getRepoContributors(owner, repo, (result) => {
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
