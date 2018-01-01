const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VariantSchema = new Schema({
    name: String,
    nodes: Schema.Types.Mixed,
    color: Boolean
}, { minimize: false });

let Variant = mongoose.model('Variant', VariantSchema);

module.exports = Variant;
