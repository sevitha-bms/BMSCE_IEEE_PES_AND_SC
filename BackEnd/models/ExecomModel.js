const mongoose = require('mongoose');

const execomSchema = new mongoose.Schema(
    {
        year: Number,
        name: String,
        designation: String,
        order: Number,
        imgLink: String
    },
    {collection:'Execom'}
)

const Execom = mongoose.model('Execom' , execomSchema);
module.exports = Execom;