const mongoose = require('mongoose');

const lottieSchema = new mongoose.Schema(
    {
        filename: String,
        json: Object,
    },
    {collection: 'JSON-Files'}
);

const Lottie = mongoose.model('Lottie',lottieSchema);

module.exports = Lottie;