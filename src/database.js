const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
	if(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('DATABASE CONECCTION WAS CLOSED');

		}
		if(err.code === 'ERR_CON_COUNT_ERROR'){
			console.error('DATABASE HAS TO MANY CONNECTIONS');

		}
		if(err.code === 'ECONNREFUSED') {
			console.error('DATABASE CONNECTION WAS REFUSED');
		}
	}

	if(connection) connection.release();
	console.log('DB IS CONNECT');
	return;
});


 pool.query = promisify(pool.query); /*Gracias a esta linea de codigo, podemos utilizar promesas*/

module.exports = pool;