const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RepertoireSchema = new Schema({
    name: String,
    color: Boolean,
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }]
}, { minimize: false });

let Repertoire = mongoose.model('Repertoire', RepertoireSchema);

module.exports = Repertoire;
