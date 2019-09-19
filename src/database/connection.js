const mysql = require('mysql')

var connection = null

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL, { multipleStatements: true });
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'testpwa',
        multipleStatements: true 
    })
}

module.exports = connection