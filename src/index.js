const express = require('express')
const bodyparser = require('body-parser')
const allowCors = require('./cors/Cors')

const server = express()
const router = express.Router()
const port = process.env.PORT || 5000

server.use(allowCors)
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())

const recipeController = require('./routes/RecipeController')
const authController = require('./routes/AuthController')

router.get('/', (req, res) => {
  res.json({
    message: `Server listening on port ${port}`
  })
})

server.use('/', router)
server.use('/recipes', recipeController)
server.use('/auth', authController)

server.listen(port, (req, res) => {
  console.log(`Server listening on port ${port}`)
})
