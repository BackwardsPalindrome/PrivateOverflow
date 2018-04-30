const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: [String], required: true },
  code: { type: String, required: true },
  description: String,
  complexity: String
})

exports.module = mongoose.model('Snippet', snippetSchema)
