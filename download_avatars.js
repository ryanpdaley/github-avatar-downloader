var request = require('request');
var fs = require('fs');
var GITHUB_USER = "ryanpdaley";
var GITHUB_TOKEN = "Y421c7222f0973fa813cb340417f656d8c4a62738";

var options = {
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };

function getImageURLs(jsonDump){
  for (var key in jsonDump){
    console.log(jsonDump[key].avatar_url)
  }
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    getImageURLs(info);
  } else {
    console.log('Response Status Code: ', response.statusCode);
    console.log('Response Message: ', response.statusMessage);
    console.log('Response Content Type: ', response.headers['content-type']);
  }
}



function getRepoContributors(repoOwner, repoName, cb) {
  //var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestURL = 'https://api.github.com/repos/jquery/jquery/contributors'
  options['url'] = requestURL
  console.log(options)
  var body = request(options, callback);
//   request.get(requestURL)
//         .set('User-Agent', macUAString)

//        .on('error', function (err) {
//          throw err;
//        })
//        .on('response', function (response) {
//          console.log('Response Status Code: ', response.statusCode);
//          console.log('Response Message: ', response.statusMessage);
//          console.log('Response Content Type: ', response.headers['content-type']);
//        });
//        //.pipe(fs.createWriteStream('./future.jpg'));
}

getRepoContributors('jquery', 'jquery', 'callback')