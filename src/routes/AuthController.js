var express = require('express')
const bcrypt = require('bcrypt')
var router = express.Router()
var AuthService = require('../model/auth/AuthService')
var ResponseEntity = require('../model/ResponseEntity')

router.post('/', (req, res) => {
  const { user } = req.body
  
  AuthService.findByEmail(user, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to login (user: ${user}): ${error}`
      res.status(500).json(responseEntity)
      return
    }

    if(!queryResponse || queryResponse.length === 0) {
      responseEntity.data = queryResponse
      responseEntity.message = `Email does not exist`
      res.status(400).json(responseEntity)
      return
    }

    const isPassword = bcrypt.compareSync(user.password, queryResponse[0].password)
    if(isPassword) {
      responseEntity.data = queryResponse
      responseEntity.message = `Success`
      res.status(200).json(responseEntity)
      return
    }

    responseEntity.data = null
    responseEntity.message = `Invalid password`
    res.status(403).json(responseEntity)
    return
  })
})

router.post('/new', (req, res) => {
  const { user } = req.body
  
  AuthService.save(user, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to save (user: ${user}): ${error}`
      res.json(responseEntity).status(500)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.json(responseEntity).status(200)
    return
  })
})

module.exports = router
