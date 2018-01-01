var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
    // _id: Schema.Types.ObjectId,
    name: String,
    nickname: String,
    userId: String,
    // email: String,
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }]
});

module.exports = User;
