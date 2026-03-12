require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use(express.json());
const port = process.env.PORT || 8000


const sequelize = require('./config/database')
//Admin Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');
const categoryRoutes = require('./routes/categories');
const colorsRoutes = require('./routes/colors');
const brandRoutes = require('./routes/brands');
const productRoutes = require('./routes/products');
const sizeRoutes = require('./routes/size');
app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/admin',
    dashboardRoutes,
    profileRoutes,
    categoryRoutes,
    brandRoutes,
    colorsRoutes,
    productRoutes,
    sizeRoutes,
);

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
        console.log(`E-commerce api listening on port ${process.env.URL}:${port}`)
    });
}
startSever();
