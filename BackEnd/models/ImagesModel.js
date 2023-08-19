const mongoose = require('mongoose');

const ImagesSchema = new mongoose.Schema(
    {
        posterType: String,
        imgName: String,
        order: Number,
        imgLink: String
    },
    {collection:'Images'}
)

const Images = mongoose.model('Images' , ImagesSchema);
module.exports = Images;