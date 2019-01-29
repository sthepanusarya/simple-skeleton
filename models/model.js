const Connection = require('../connection');
const db = new Connection();

/**
 * Model constructor
 * @param {String} table Associate model to table
 */
function Model(table) {
  this.table = table;
  this.column = ['*'];
  this.primaryKey = 'id';
}

/**
 * Execute raw query
 * @param {String} sql Raw sql string with placeholder
 * @param {Array} args Array of value that will replace the placeholder
 * @return {Promise}
 */
Model.prototype.query = function(sql, args) {
  return db.query(sql, args);
};

/**
 * Generate array of "?" mark for query placeholder
 * @param {Number} lenght The length of response array
 * @return {Array}
 */
Model.prototype.placeHolderMaker = function(lenght) {
  const result = [];
  for (let i = 0; i < lenght; i++) {
    result.push('?');
  }
  return result;
};

/**
 * Find row by primary key
 * @param {Number} id
 * @return {Promise}
 */
Model.prototype.findByID = function(id) {
  const sql = `SELECT ${this.column.join()} FROM ${this.table} `
    + `where ${this.primaryKey}=${id}`;
  return db.query(sql, id);
};

/**
 * Get all rows in the table
 * @return {Promise}
 */
Model.prototype.all = function() {
  const sql = `SELECT ${this.column.join()} FROM ${this.table}`;
  return db.query(sql);
};

/**
 * Insert new row to the table
 * @param {Object} param The table column must be the object key
 * @return {Promise}
 */
Model.prototype.create = function(param) {
  const columns = Object.keys(param);
  const values = Object.values(param);
  const placeHolder = this.placeHolderMaker(columns.length);

  const sql = `INSERT INTO ${this.table}(${columns.join()}) `
    + `VALUES( ${placeHolder.join()} )`;
  return db.query(sql, values);
};

/**
 * Update a row in the table
 * @param {Object} param The table column must be the object key
 * @param {Object} ident The identifier for the row
 * @return {Promise}
 */
Model.prototype.update = function(param, ident) {
  const values = Object.values(param);
  const columns = Object.keys(param).map((e) => e + ' = ?').join();
  const identColumn = Object.keys(ident);
  const identValue = Object.values(ident);

  const sql = `UPDATE ${this.table} SET ${columns}, updatedAt=now() `
    + `where ${identColumn}=?`;
  return db.query(sql, values.concat(identValue));
};

/**
 * Remove row by the identifier
 * @param {Object} param The identifier for the row
 * @return {Promise}
 */
Model.prototype.delete = function(param) {
  const columns = Object.keys(param);
  const values = Object.values(param);

  const sql = `DELETE FROM ${this.table} where ${columns[0]}=?`;
  return db.query(sql, values[0]);
};

module.exports = Model;
