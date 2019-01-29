const mysql = require('mysql');

/**
 * Database constructor
 */
function DB() {
  this.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
}

/**
 * Promise wrapper for native MySQL query function
 * @param {String} sql
 * @param {Array} args
 * @return {Promise}
 */
DB.prototype.query = function( sql, args ) {
  return new Promise( ( resolve, reject ) => {
    this.connection.query( sql, args, ( err, rows ) => {
      if ( err ) {
        return reject( err );
      }
      resolve( rows );
    } );
  } );
};

module.exports = DB;
