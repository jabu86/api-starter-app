require('dotenv').config(); // 🔑 Must be at the very top of the file

module.exports = {
    development: {
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || "shop",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "5432",
        dialect: "postgres" // 💡 Keep this string raw, do not wrap it in process.env unless defined in .env
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql"
    }
};
