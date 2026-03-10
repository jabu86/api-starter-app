require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
const port = process.env.PORT || 8000
//comment to git master brance

const sequelize = require('./config/database')
//Define Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
app.use('/api', indexRoutes, authRoutes ,dashboardRoutes);

async function connectDB(){
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connected successfully ");
    }catch (e) {
        console.error("Error connecting to database: " + e);
        process.exit(1);
    }
}

async function startSever(){
    await connectDB();
    app.listen(port, () => {
        console.log(`E-commerce api listening on port http://localhost:${port}`)
    })
}

startSever();
