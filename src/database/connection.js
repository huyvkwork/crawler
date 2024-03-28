const mysql = require('mysql2/promise');
const config = require('../../config/database');

async function connect() {
	return await mysql.createConnection(config);
}

module.exports = connect;