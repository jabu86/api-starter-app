const { Products , product_images, product_colors, product_size} = require('../models');
const {body, validationResult} = require('express-validator');


exports.index = async (req, res) => {
    try {
        const products = await Products.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({products, message:"Get Products" });
    }catch(err) {
        console.error(err)
    }
}

exports.create =  async(req, res) => {

    const { name, description, price , category_id, brand_id, quantity, in_stock, active, colors, size} = req.body;

    try {
        const newProduct = await  Products.create({
            name : name,
            category_id : category_id,
            brand_id : brand_id,
            description : description,
            price : price,
            quantity : quantity,
            in_stock : in_stock,
            active : active,
        });
        for (const image of req.processedImages) {
            await product_images.create({
                product_id:newProduct.id,
                image:image.image,
            })
        }

        const colorsArray = Array.isArray(colors)
            ? colors.flatMap(c => c.split(","))
            : colors.split(",");

        const sizeArray = Array.isArray(size)
            ? size.flatMap(s => s.split(","))
            : size.split(",");

        await product_colors.bulkCreate(
            colorsArray.map(color => ({
                product_id: newProduct.id,
                color_id: color
            }))
        );

        await product_size.bulkCreate(
            sizeArray.map(s => ({
                product_id: newProduct.id,
                size_id: s
            }))
        );

        // console.log("Product ID:", newProduct.id);
        // console.log("Colors:", colors);
        // console.log("Colors array:", colorsArray);
        return  res.status(200).json({newProduct, message : "Product created successfully."});
    }catch(err) {
        console.error(err)
    }
}




exports.update = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name , id } = req.body;
    try {
        const brand = await Brand.findByPk(id);
        brand.name = name;
        brand.image = `/brands/${req.file.filename}`;
        await  brand.save()
        return res.status(200).send({brand, message:"Brand updated successfully."});
    }catch(err) {
        console.error(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        await brand.destroy();
        return res.status(200).json({brand, message : "Brand removed successfully."});
    }catch(err) {
        console.error(err)
    }
}

