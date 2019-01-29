require('dotenv').config({path: '../.env'});
const Model = require('./model');

const Car = new Model('car');

Car.query(`SELECT ${Car.column.join()} FROM ${Car.table}`)
    .then((rows) => console.log(rows))
    .catch((err) => console.log(err));

// Car.create({
//     name: "BMW i8",
//     year: 2017
// }).then(row => console.log(row.insertId));

// Car.update({
//     name: "BMW i8",
//     year: 2018
// }, {
//     id: 1
// }).then(row => console.log(row.insertId));

// Car.delete({
//     id: 1
// })
// .then(rows => console.log(rows));
