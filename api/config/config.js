require("dotenv").config(); // 🔑 Must be at the very top of the file

const sslOptions = {
  require: true,
  rejectUnauthorized: false,
};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres", // 💡 Keep this string raw, do not wrap it in process.env unless defined in .env
       
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres", // 💡 Keep this string raw, do not wrap it in process.env unless defined in .env
    dialectOptions: {
      ssl: sslOptions,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres", // 💡 Keep this string raw, do not wrap it in process.env unless defined in .env
    dialectOptions: {
      ssl: sslOptions,
    },
  },
};
