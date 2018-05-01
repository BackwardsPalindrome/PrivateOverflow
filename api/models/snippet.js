const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: [String], required: true },
  code: { type: String, required: true },
  language: String,
  description: String,
  complexity: String
})

module.exports = mongoose.model('Snippet', snippetSchema)
