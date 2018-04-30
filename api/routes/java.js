const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /java'
  })
})

router.post('/', (req, res, next) => {
  const snippet = {
    title: req.body.title,
    code: req.body.code
  }
  res.status(201).json({
    message: 'Handling POST requests to /java',
    snippet: snippet
  })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  res.status(200).json({
    message: 'Handling GET requests to /java/:id',
    id: id
  })
})

router.patch('/:id', (req, res, next) => {
  const id = req.params.id
  res.status(200).json({
    message: 'Handling PATCH requests to /java/:id',
    id: id
  })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  res.status(200).json({
    message: 'Handling DELETE requests to /java/:id',
    id: id
  })
})

module.exports = router
