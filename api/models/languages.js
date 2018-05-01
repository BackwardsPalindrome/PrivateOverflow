const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
  language: String
})

module.exports = mongoose.model('Language', languageSchema)
