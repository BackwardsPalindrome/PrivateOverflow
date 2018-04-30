const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Return list of all available languages'
  })
})

router.get('/:lang', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /' + req.params.lang
  })
})

router.post('/:lang', (req, res, next) => {
  const tags = req.body.tags
  const title = req.body.title.split(' ').join('-')
  tags.unshift('java')
  const snippet = {
    title: title,
    tags: tags,
    code: req.body.code,
    description: req.body.description,
    complexity: req.body.complexity
  }
  res.status(201).json({
    message: 'Handling POST requests to /java',
    snippet: snippet
  })
})

router.get('/:lang/:title', (req, res, next) => {
  let title = ''
  req.params.title.split('-').forEach(word => {
    title += word.charAt(0).toUpperCase() + word.slice(1) + ' '
  })

  res.status(200).json({
    message: `Handling GET requests to /${req.params.lang}/${req.params.title}`,
    title: title.trim()
  })
})

router.patch('/:lang/:title', (req, res, next) => {
  const title = req.params.title
  res.status(200).json({
    message: 'Handling PATCH requests to /java/:id',
    title: title
  })
})

router.delete('/:lang/:title', (req, res, next) => {
  const title = req.params.title
  res.status(200).json({
    message: 'Handling DELETE requests to /java/:id',
    title: title
  })
})

module.exports = router
