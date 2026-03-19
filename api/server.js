require('dotenv').config()
const express = require('express')
 const path = require('path')
 const cors =require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000

// Serve static files from public folder
app.use("/images", express.static(path.join(__dirname, "public/images")));
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
        console.log(`E-commerce api listening on port  ${process.env.URL}:${process.env.PORT}`);
    });
}


startSever();
