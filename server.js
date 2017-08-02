// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

var db = require("./models");

// serve static files from public folder
app.use(express.static(__dirname + '/public'));




var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
/* hard-coded data */




/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
        message: "Welcome to tunely!",
        documentation_url: "https://github.com/tgaff/tunely/api.md",
        base_url: "http://tunely.herokuapp.com",
        endpoints: [
            {method: "GET", path: "/api", description: "Describes available endpoints"}
        ]
    });
});

app.get('/api/albums', function album_index(req, res) {
  db.Album.find({}, function (error, albums) {
        res.json(albums);
    });
});

app.post('/api/albums', function (req, res) {
    req.body.genres = req.body.genres.split(', ');
    db.Album.create(req.body, function (err, album) {
      if (err) {return console.log(err); }
      res.json(album);
    });
    
});

app.get('/api/albums/:id', function(req, res) {
  var thisId = req.params.album_id;  

  db.Album.get({ id: req.params.album_id }, function(error, album) {
    if(error) return console.log("error: " + error);
    res.json(album);
    });
  });

app.post('/api/albums/:album_id/songs', function (req, res) {
  var thisId = req.params.album_id;
  db.Song.create({
    name: req.body.name,
    trackNumber: req.body.trackNumber
  }, function (err, song) {
      if (err) return console.log("error: " + err);
    
      db.Album.findById(thisId, function(err, album) {
        if (err) return console.log("error: " + err);
        album.songs.push(song);
        album.save(function (err) {
          if (err) return console.log("error: " + err);
          console.log(album.songs);
          res.json(album);
        });
      });
    });
  });



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
