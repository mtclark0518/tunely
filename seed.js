// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList = [
    {
        name: 'The College Dropout',
        releaseDate: '2004, February 10',
        genres: [ 'rap', 'hip hop' ]
    },
    {
        artistName: 'the New Kanye',
        name: 'The Life of Pablo',
        releaseDate: '2016, Febraury 14',
        genres: [ 'hip hop' ]
    },
    {
        artistName: 'the always rude Kanye',
        name: 'My Beautiful Dark Twisted Fantasy',
        releaseDate: '2010, November 22',
        genres: [ 'rap', 'hip hop' ]
    },
    {
        artistName: 'the sweet Kanye',
        name: '808s & Heartbreak',
        releaseDate: '2008, November 24',
        genres: [ 'r&b', 'electropop', 'synthpop' ]
    },
];

var sampleSongs = [

        { name: 'Famous',
                   trackNumber: 1
            },
        { name: "All of the Lights",
                   trackNumber: 2
            },
        { name: 'Guilt Trip',
                   trackNumber: 3
            },
        { name: 'Paranoid',
                   trackNumber: 4
            },
        { name: 'Ultralight Beam',
                   trackNumber: 5
            },
        { name: 'Runaway',
                   trackNumber: 6
            },
        { name: 'Stronger',
                   trackNumber: 7
            }
    ];


db.Song.remove({}, function(err, songs) {
    db.Song.create(sampleSongs, function (err, songs) {
        if (err) {return console.log("error: " + err); }
        // console.log(songs);

        db.Album.remove({}, function (err, albums) {
            albumsList.forEach(function (albumData) {
                var album = new db.Album({
                    artistName: albumData.artistName,
                    name: albumData.name,
                    releaseDate: albumData.releaseDate,
                    genres: albumData.genres,
                });
                album.songs = songs;
                album.save(function (err) {
                    if (err) { return console.log(err); }
                    console.log("album saved " + album);
                });
            });
        });
    });
});
//     });
// });


//         albumsList.forEach(function (albumData) {
//         var album = new db.Album({
//             artistName: albumData.artistName,
//             name: albumData.name,
//             releaseDate: albumData.releaseDate,
//             genres: [albumData.genres],
//             songs: [sampleSongs]
//         });
//         console.log(album);
//     });
//     if (err) { return console.log('ERROR', err); }
//     console.log("all albums:", albums);
//     console.log("created", albums.length, "albums");
//     console.log("This is album 3: " + albums[2]);
//     process.exit();
// });

// });
        // if (err) { return console.log('ERROR', err); }
        // for (var i = 0; i < albums.length; i++) {
        //     albums[i].songs; = [{
        //         name: sampleSongs.name,
        //         trackNumber: sampleSongs.trackNumber
        //     }];
        //     console.log(albums[i]);
// albums[i].songs = sampleSongs;
         // db.Song.find({}, function(err, songs) {
            //         if (err) {return console.log(err); }
            //         album.songs = db.songs;
            //         album.save(function (err, savedAlbum) {
            //             if (err) {return console.log(err); }
            //             console.log('saved ' + savedAlbum);

                //     });
                // });