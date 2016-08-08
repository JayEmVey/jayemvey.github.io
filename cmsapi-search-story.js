var http = require("https");
// Prevent self-sign certificate rejected by nodejs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST call');
/**
 * HOW TO Make an HTTP Call - POST
 */

// prepare the header
var postheaders = {
    "Authorization": "loan.admin~pQO/W65xV6SGrWb/V4PKZIjo5A6AtNtNZW+NWuzhE67CEmWY/miBtMst8oFZvWDEGLuumDSF+a9H9pDl2UJjpw==~6",
    'Content-Type':'application/xml'
};

// the post options
var optionspost = {
    host : 'cms.ddev1.worldnow.com',
    port : 443,
    path : '/v1.0/stories/search',
    method : 'POST',
    headers : postheaders
};
// do the POST call
var reqPost = http.request(optionspost, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);

    res.on('data', function(d) {
        process.stdout.write(d);
    });
});

// write the json data
reqPost.write("<storysearchcriteria xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://api.worldnow.com/cms\">\r    <affiliateid>6</affiliateid>\r    <featuretype>Story</featuretype>\r    <id>24750245</id>\r</storysearchcriteria>");
reqPost.end();
reqPost.on('error', function(e) {
    console.error('error' + e);
});