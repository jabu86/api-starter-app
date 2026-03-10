require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
const port = process.env.PORT || 8000


const sequelize = require('./config/database')
//Define Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');
app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/admin',dashboardRoutes, profileRoutes);

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
