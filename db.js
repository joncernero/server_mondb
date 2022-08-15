const { Sequelize } = require('sequelize');
// const db = new Sequelize('monster-crm-database', 'postgres', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // very important
    },
  },
});

db.authenticate().then(
  function () {
    console.log(`Connected to monster-crm-database postgres database`);
  },
  function (err) {
    console.log(err);
  }
);

module.exports = db;
