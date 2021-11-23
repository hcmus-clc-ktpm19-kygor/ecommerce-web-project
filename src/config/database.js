require('dotenv').config()
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

async function connectToDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('Connection to the database has been established successfully.');
  }
  catch (error) {
    console.error(error.message);
    process.exit(-1);
  }
}

connectToDB();

module.exports = sequelize;