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
      res.status(500).json(responseEntity)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.status(200).json(responseEntity)
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
      res.status(500).json(responseEntity)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.status(200).json(responseEntity)
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
      res.status(500).json(responseEntity)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (recipe: ${recipe}): ${error}`
      res.status(400).json(responseEntity)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.status(200).json(responseEntity)
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
      res.status(500).json(responseEntity)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (recipe: ${recipe}): ${error}`
      res.status(400).json(responseEntity)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.status(200).json(responseEntity)
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
      res.status(500).json(responseEntity)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (recipe: ${recipe}): ${error}`
      res.status(400).json(responseEntity)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.status(200).json(responseEntity)
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
      res.status(500).json(responseEntity)
      return
    }

    if(queryResponse.affectedRows <= 0) {
      responseEntity.message = `No lines affected (id: ${id}): ${error}`
      res.status(400).json(responseEntity)
      return
    }

    responseEntity.data = queryResponse
    responseEntity.message = `Success`
    res.status(200).json(responseEntity)
    return
  })
})

module.exports = router
