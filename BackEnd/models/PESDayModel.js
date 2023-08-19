const mongoose = require('mongoose');

const PESDaySchema = new mongoose.Schema(
    {
        title: String,
        date: String,
        time: String, 
        description: String,
        imgLink: String,
        regLink: String
    },
    {collection:'PES-DAY-EVENTS'}
)

const PESDay = mongoose.model('PESDay' , PESDaySchema);
module.exports = PESDay;