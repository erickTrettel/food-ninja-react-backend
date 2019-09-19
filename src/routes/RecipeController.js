var express = require('express')
var router = express.Router()
var RecipeService = require('../model/recipes/RecipeService')
var ResponseEntity = require('../model/ResponseEntity')

router.get('/', (req, res) => {
  RecipeService.findAll((error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to find all recipes: ${error}`
      res.json(responseEntity).status(500)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.json(responseEntity).status(200)
    return
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  RecipeService.findById(id, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to find recipe by id (id: ${id}): ${error}`
      res.json(responseEntity).status(500)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.json(responseEntity).status(200)
    return
  })
})

router.post('/', (req, res) => {
  const { recipe } = req.body
  
  RecipeService.save(recipe, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to save recipe (recipe: ${recipe}): ${error}`
      res.json(responseEntity).status(500)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (recipe: ${recipe}): ${error}`
      res.json(responseEntity).status(400)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.json(responseEntity).status(200)
    return
  })
})

router.put('/', (req, res) => {
  const { recipe } = req.body
  
  RecipeService.update(recipe, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to update recipe (recipe: ${recipe}): ${error}`
      res.json(responseEntity).status(500)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (recipe: ${recipe}): ${error}`
      res.json(responseEntity).status(400)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.json(responseEntity).status(200)
    return
  })
})

router.delete('/', (req, res) => {
  const { recipe } = req.body
  
  RecipeService.delete(recipe, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to delete recipe (recipe: ${recipe}): ${error}`
      res.json(responseEntity).status(500)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (recipe: ${recipe}): ${error}`
      res.json(responseEntity).status(400)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.json(responseEntity).status(200)
    return
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  
  RecipeService.deleteById(id, (error, queryResponse) => {
    let responseEntity = new ResponseEntity()
    if(error) {
      responseEntity.error = true
      responseEntity.message = `Failed to delete recipe by id (id: ${id}): ${error}`
      res.json(responseEntity).status(500)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (id: ${id}): ${error}`
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
