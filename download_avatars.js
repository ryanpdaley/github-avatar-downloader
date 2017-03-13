var request = require('request');
var fs = require('fs');
var GITHUB_USER = "ryanpdaley";
var GITHUB_TOKEN = "Y421c7222f0973fa813cb340417f656d8c4a62738";
var AVATAR_DIR = './avatars/';

var options = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

function getImageURLs(jsonDump){
  avatarUrls = {};
  for (var key in jsonDump){
    avatarUrls[jsonDump[key].login] = jsonDump[key].avatar_url
  }
  return avatarUrls;
}

function downloadImageByURL(url, filePath) {
  options['url'] = url;
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(filePath));
}

function getAvatarInfo(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var avatarUrls = getImageURLs(info);
    console.log(avatarUrls);
    for (var key in avatarUrls){
      imgURL = avatarUrls[key];
      imgFilePath = `./avatars/${key}.jpg`;
      downloadImageByURL(imgURL, imgFilePath);
    }
  } else {
    console.log('Response Status Code: ', response.statusCode);
    console.log('Response Message: ', response.statusMessage);
    console.log('Response Content Type: ', response.headers['content-type']);
  }
}



function getRepoContributors(repoOwner, repoName, cb) {
  //var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestURL = 'https://api.github.com/repos/jquery/jquery/contributors';
  //console.log(requestURL)
  options['url'] = requestURL;
  request(options, cb);
}

var args = process.argv.slice(2);
if (args.length === 2) {
  getRepoContributors(args[0], args[1], getAvatarInfo);
} else {
  console.log('Usage: node download_avatars.js <owner> <repo> - incorrect number of arguments');
}
