var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
    name: String,
    nickname: String,
    userId: String,
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }],
    repertoires: [{ type: Schema.Types.ObjectId, ref: 'Repertoire' }]
});

module.exports = User;
