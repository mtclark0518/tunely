var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var songSchema = {
    name: String,
    trackNumber: Number
};

var Song = mongoose.model('Song', songSchema);

module.exports = Song;