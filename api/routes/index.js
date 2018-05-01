const express = require('express')
const router = express.Router()

// REQUIRE MODELS
const Snippet = require('../models/snippet')

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Return list of all available languages'
  })
})

router.get('/:lang', (req, res, next) => {
  Snippet.find({ language: req.params.lang })
    .select('title tags code complexity')
    .exec()
    .then(snippets => {
      res.status(200).json({
        count: snippets.length,
        snippets: snippets.map(snippet => {
          return {
            title: snippet.title,
            tags: snippet.tags,
            code: snippet.code,
            complexity: snippet.complexity,
            request: {
              type: 'GET',
              description: 'Get this code snippet',
              url: `http://localhost:8080/${req.params.lang}/${snippet.title}`
            }
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.post('/:lang', (req, res, next) => {
  const title = req.body.title.split(' ').join('-')

  Snippet.find({ language: req.params.lang, title: title }) // check if there's already a code snippet
    .exec()
    .then(foundSnippet => {
      if (!foundSnippet) {
        const snippet = new Snippet({
          title: title,
          language: req.params.lang,
          tags: req.body.tags,
          code: req.body.code,
          description: req.body.description,
          complexity: req.body.complexity
        })
        return snippet
          .save()
      } else {
        return res.status(422).json({
          message: `There is already a snippet in ${foundSnippet.language} on ${foundSnippet.title}`,
          snippet: foundSnippet
        })
      }
    })
    .then(createdSnippet => {
      res.status(201).json({
        message: 'Snippet successfully added',
        snippet: {
          title: createdSnippet.title,
          tag: createdSnippet.tag,
          language: createdSnippet.language,
          request: {
            type: 'GET',
            description: 'View this code snippet',
            url: `http://localhost:8080/${createdSnippet.language}/${createdSnippet.title}`
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.get('/:lang/:title', (req, res, next) => {
  Snippet.find({ language: req.params.lang, title: req.params.title })
    .select('title code language description complexity')
    .exec()
    .then(foundSnippet => {
      res.status(200).json({
        snippet: {
          title: foundSnippet.title,
          complexity: foundSnippet.complexity,
          code: foundSnippet.code,
          description: foundSnippet.description
        },
        request: {
          type: 'GET',
          description: `Get all snippets in ${foundSnippet.language}`,
          url: `http://localhost:8080/${foundSnippet.language}`
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.patch('/:lang/:title', (req, res, next) => {
  const updateFields = {}
  for (const field of req.body) {
    updateFields[field.name] = field.value
  }

  Snippet.update({ language: req.params.lang, title: req.params.title }, { $set: updateFields })
    .exec()
    .then(updatedSnippet => {
      res.status(200).json({
        message: 'Code snippet updated',
        request: {
          type: 'GET',
          description: 'Get this code snippet',
          url: `http://localhost:8080/${req.params.lang}/${updatedSnippet.title}`
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

router.delete('/:lang/:title', (req, res, next) => {
  Snippet.remove({ language: req.params.lang, title: req.params.title })
    .exec()
    .then(deletedSnippet => {
      res.status(200).json({
        message: 'Snippet deleted',
        request: {
          type: 'POST',
          description: 'Create a new snippet',
          url: `http://localhost:8080/${req.params.lang}`,
          body: {
            title: 'String',
            tags: '[String]',
            code: 'String',
            optional: {
              description: 'String',
              complexity: 'String'
            }
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router
