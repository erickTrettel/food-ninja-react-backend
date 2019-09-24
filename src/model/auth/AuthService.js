const db = require('../../database/connection')

module.exports = class AuthService {
  static login({ email, password }, callback) {
    return db.query(`SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`, callback)
  }
}
