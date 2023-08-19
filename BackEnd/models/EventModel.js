const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        title: String,
        date: String,
        time: String,
        description: String,
        imgLink: String,
        regLink: String
    },
    {collection:'Events'}
)

const Event = mongoose.model('Event' , eventSchema);
module.exports = Event;