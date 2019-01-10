var request = require('request');
request.get({
  url:     'http://localhost:3000/server'
//   body:    "mes=heydude"
}, function(error, response, body){
  console.log(body);
});


// var request = require('request');
// request.post('http://localhost:3000/server/post', 
//     {form:{ mes: "heydude" }}, 
//     function(error, response, body){
//         console.log(body);
// });


const request = require('request');

const options = {
  method: 'POST',
  url: 'https://loraiot.cattelecom.com/portal/iotapi/auth/token',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  json: { 
    "username": "TGR13_37" ,
    "password": "44581009"
    }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    //const info = JSON.parse(body);
    console.log(body);
  }else
    console.log(`ERROR:`);
}

request(options, callback);