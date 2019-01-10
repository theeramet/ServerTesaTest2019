var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('./db');

var db = mongojs.connect;
var app = express();
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send("Sample Code for RESTful API");
})

// //Get all user
// app.get('/listUsers', function (req, res) {
//   db.users.find(function (err, docs) {
//     console.log(docs);
//     res.send(docs);
//   });

// })

// //Get user by ID
// app.get('/user/:id', function (req, res) {
//   var id = parseInt(req.params.id);

//   db.users.findOne({
//     id: id
//   }, function (err, docs) {
//     if (docs != null) {
//       console.log('found', JSON.stringify(docs));
//       res.json(docs);
//     } else {
//       res.send('User not found');
//     }
//   });
// })

// //add data
// app.post('/addData', function (req, res) {
//   var json = req.body;
//   db.temp.insert(json, function (err, docs) {
//     console.log(docs);
//     res.send(docs);
//   });
// })



// //Update user by ID in body
// app.put('/user', function (req, res) {
//   console.log('Get from Api', req.body);
//   db.users.findAndModify({
//     query: {
//       id: req.body['id']
//     },
//     update: {
//       $set: req.body
//     },
//     new: true
//   }, function (err, docs) {
//     console.log('Update Done', docs);
//     res.json(docs);
//   });
// })

// //Add user
// app.post('/addUser', function (req, res) {
//   var json = req.body;
//   db.users.insert(json, function (err, docs) {
//     console.log(docs);
//     res.send(docs);
//   });


// })

// //Delete user by ID
// app.delete('/deleteUser/:id', function (req, res) {
//   var id = parseInt(req.params.id);
//   db.users.remove({
//     id: id
//   }, function (err, docs) {
//     console.log(docs);
//     res.send(docs);
//   });
// })

///////////////////////////

// app.post('/addData', function (req, res) {
//   var json = req.body;
//   db.temp.insert(json, function (err, docs) {
//     console.log(docs);
//     res.send(docs);
//   });
// })



//Get all user
app.get('/showData', function (req, res) {
  db.temperature.find(function (err, docs) {
    console.log(docs);
    res.send(docs);
  });

})

// //Get user by ID
// app.get('/user/:id', function (req, res) {
//   var id = parseInt(req.params.id);

//   db.temp.findOne({
//     id: id
//   }, function (err, docs) {
//     if (docs != null) {
//       console.log('found', JSON.stringify(docs));
//       res.json(docs);
//     } else {
//       res.send('User not found');
//     }
//   });
// })

//Update user by ID in body
// app.put('/user', function (req, res) {
//   console.log('Get from Api', req.body);
//   db.users.findAndModify({
//     query: {
//       id: req.body['id']
//     },
//     update: {
//       $set: req.body
//     },
//     new: true
//   }, function (err, docs) {
//     console.log('Update Done', docs);
//     res.json(docs);
//   });
// })

//Add Data
app.post('/addData', function (req, res) {
  var json = req.body;
  db.temperature.insert(json, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });
})

//Delete user by ID
app.delete('/delete/:teamID', function (req, res) {
  var id = req.params.teamID;
  db.temperature.remove({
    teamID: id
  }, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });
})


var server = app.listen(8080, function () {
  var port = server.address().port

  console.log("Sample Code for RESTful API run at ", port)
})
module.exports = app;