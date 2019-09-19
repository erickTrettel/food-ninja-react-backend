const express = require('express')
const bodyparser = require('body-parser')
const allowCors = require('./cors/Cors')

const server = express()
const router = express.Router()
const port = process.env.PORT || 3000

server.use(allowCors)
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())

const recipeController = require('./routes/RecipeController')

router.get('/', (req, res) => {
  res.json({
    message: `Server listening on port ${port}`
  })
})

server.use('/', router)
server.use('/recipes', recipeController)

server.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`)
})
