// create web server
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// create app
const app = express()
// use middleware
app.use(bodyParser.json())
app.use(cors())
// create comment
const comments = {}
// create route
app.get('/posts/:id/comments', (req, res) => {
  res.send(comments[req.params.id] || [])
})
// create route
app.post('/posts/:id/comments', (req, res) => {
  const { content } = req.body
  const commentId = randomBytes(4).toString('hex')
  const comments = comments[req.params.id] || []
  comments.push({ id: commentId, content })
  comments[req.params.id] = comments
  res.status(201).send(comments)
})
// listen to port
app.listen(4001, () => {
  console.log('Listening on 4001')
})