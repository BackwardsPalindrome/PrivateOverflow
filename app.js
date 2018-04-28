const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello')
})

// Listen
const port = process.env.PORT || 3000
app.listen(port, process.env.IP, () => {
  console.log(`Server started on port ${port}`)
})
