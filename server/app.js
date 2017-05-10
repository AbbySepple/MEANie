var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exstended: true}));
app.use(express.static('public'));

var port = process.env.PORT || 8080;

// 27017 is default mongo port
mongoose.connect('localhost:27017/meanie');
var ourSchema = mongoose.Schema({
  name: String,
  location: String
});

var ourModels = mongoose.model('ourModels', ourSchema);
app.get('/', function(req, res) {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/getRecords', function(req, res) {
  // get and send back all the things
  ourModels.find().then(function(data) {
    res.send(data);
  });
});

app.post('/testPost', function(req, res) {
  console.log('req.body.name: ' + req.body.name);
  // retrieved the req.body
  // putting it into an object to be saved in the db
  var recordToAdd = {
    name: req.body.name,
    location: req.body.location
  };
  // create new record
  var newRecord = ourModels(recordToAdd);
  newRecord.save();
});

app.listen(port, function() {
  console.log('listening on 8080');
});

app.delete('/deleteRecords/:id', function(req, res){
  ourModels.remove({_id : req.params.id}).then(function(){
    res.send(200);
  });
});
