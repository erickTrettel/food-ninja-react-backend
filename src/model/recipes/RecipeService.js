const db = require('../../database/connection')

module.exports = class RecipeService {
  static findAll(callback) {
    return db.query(`SELECT * FROM recipes`, callback)
  }

  static findById(id, callback) {
    return db.query(`SELECT * FROM recipes WHERE id = ${id}`, callback)
  }

  static save(recipe, callback) {
    return db.query(`INSERT INTO recipes (title, ingredients) VALUES ('${recipe.title}', '${recipe.ingredients}')
    `, callback)
  }

  static update(recipe, callback) {
    return db.query(`UPDATE recipes SET title = '${recipe.title}', ingredients = '${recipe.ingredients}' WHERE id = ${recipe.id}`, callback)
  }

  static delete(recipe, callback) {
    return db.query(`DELETE FROM recipes WHERE id = ${recipe.id}`, callback)
  }

  static deleteById(id, callback) {
    return db.query(`DELETE FROM recipes WHERE id = ${id}`, callback)
  }
}
