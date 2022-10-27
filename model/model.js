const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: String,
    title_img: String,
    synopsis: String,
    banner: String,
    ratings: String,
    path: String,
})



module.exports = mongoose.model('Data', dataSchema)
