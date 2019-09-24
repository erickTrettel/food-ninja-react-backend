var express = require('express')
var router = express.Router()
var AuthService = require('../model/auth/AuthService')
var ResponseEntity = require('../model/ResponseEntity')

router.post('/', (req, res) => {
  const { user } = req.body
  
  AuthService.login(user, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to login (user: ${user}): ${error}`
      res.json(responseEntity).status(500)
      return
    }

    if(queryResponse.length === 0) {
      responseEntity.data = queryResponse
      responseEntity.message = `Wrong email or password`
      res.json(responseEntity).status(400)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.json(responseEntity).status(200)
    return
  })
})

module.exports = router
