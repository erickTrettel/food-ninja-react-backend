const db = require('../../database/connection')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = class AuthService {
  static findByEmail({ email }, callback) {
    return db.query(`SELECT * FROM user WHERE email = '${email}'`, callback)
  }

  static save(user, callback) {
    const password = bcrypt.hashSync(user.password, salt)
    return db.query(`INSERT INTO user (email, password) VALUES ('${user.email}', '${password}')`, callback)
  }
}
