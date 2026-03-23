const { Products , product_images, product_colors, product_size} = require('../../models');
const {body, validationResult} = require('express-validator');
const sequelize = require("../../config/database");
const fs = require("fs-extra");
const path = require("path");
exports.index = async (req, res) => {
    try {
        const products = await Products.findAll({
            order: [['createdAt', 'DESC']],
            include: ['category', 'brand','images', 'sizes' , 'colors' ],
        });
        return res.status(200).json({products, message:"Get Products" , success: true });
    }catch(err) {
        console.error(err)
    }
}

exports.create =  async(req, res) => {
    const { name, description, price , category_id, brand_id, quantity, in_stock, active, colors, size} = req.body;
    const t = await sequelize.transaction();

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
        },{transaction : t});

        if(req.processedImages && req.processedImages.length > 0) {
            for (const image of req.processedImages) {
                await product_images.create({
                    product_id: newProduct.id,
                    image: image.image,
                    thumbnail:image.thumbnail
                }, { transaction : t});
            }
        }

        if(colors){
            const colorsArray = Array.isArray(colors)
                ? colors.flatMap(c => c.split(","))
                : colors.split(",");

            const validColors = colorsArray.filter(c => c && c !== "0");
            if(validColors.length > 0){
                await product_colors.bulkCreate(
                    colorsArray.map(color => ({
                        product_id: newProduct.id,
                        color_id: color
                    })),{ transaction : t}
                );
            }
        }

        if(size){
            const sizeArray = Array.isArray(size)
                ? size.flatMap(s => s.split(","))
                : size.split(",");

            const validSizes = sizeArray.filter(s => s && s !== "0");
            if(validSizes.length > 0){

                await product_size.bulkCreate(
                    sizeArray.map(s => ({
                        product_id: newProduct.id,
                        size_id: s
                    })),{ transaction : t}
                );
            }
        }

        // console.log("Product ID:", newProduct.id);
        // console.log("Colors:", colors);
        // console.log("Colors array:", colorsArray);
        await t.commit();

        //Get create product
        const product = await Products.findByPk(newProduct.id, {
            include: ['category', 'brand','images', 'sizes' , 'colors' ]
        });
        return  res.status(200).json({product, message : "Product created successfully." , success: true});
    }catch(err) {
        if (!t.finished) {
            await t.rollback();
        }

        console.error(err);

        return res.status(500).json({
            message: "Product creation failed"
        });
    }
}



exports.update =  async(req, res) => {
    const { name, description, price , category_id, brand_id, quantity, in_stock, active, colors, size} = req.body;
    const t = await sequelize.transaction();
    try {
        const product = await Products.findByPk(req.params.id,
            {include: ['category', 'brand','images', 'sizes' , 'colors' ]});
        product.name = name;
        product.category_id = category_id;
        product.brand_id = brand_id;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.in_stock = in_stock;
        product.active= active;
        await product.save();


        if(req.processedImages && req.processedImages.length > 0) {

            const getImages = await product_images.findAll({where:{product_id:product.id}});

            if(getImages.length > 0){
                await product_images.destroy({
                    where: {product_id:product.id},
                    transaction : t
                })
                for (const image of getImages) {

                    const folder = path.dirname(image.image);

                    const folderPath = path.join("public", folder);

                    await fs.remove(folderPath);
                }
            }


            for (const image of req.processedImages) {
                await product_images.create({
                    product_id: product.id,
                    image: image.image,
                    thumbnail:image.thumbnail
                }, { transaction : t});
            }
        }



        if(colors){
            const getColors = await product_colors.findAll( {where : {product_id :product.id}})
            if(getColors){
                await product_colors.destroy({
                    where: {product_id:product.id},
                    transaction : t
                })
            }
            const colorsArray = Array.isArray(colors)
                ? colors.flatMap(c => c.split(","))
                : colors.split(",");

            const validColors = colorsArray.filter(c => c && c !== "0");
            if(validColors.length > 0){
                await product_colors.bulkCreate(
                    colorsArray.map(color => ({
                        product_id: product.id,
                        color_id: color
                    })), { transaction : t}
                );
            }
        }

        if(size){
            const getSizes = await product_size.findAll({where : {product_id :product.id}})
            if(getSizes){
                if(getSizes){
                    await product_size.destroy({
                        where: {product_id:product.id},
                        transaction : t
                    })
                }
            }
            const sizeArray = Array.isArray(size)
                ? size.flatMap(s => s.split(","))
                : size.split(",");

            const validSizes = sizeArray.filter(s => s && s !== "0");
            if(validSizes.length > 0){

                await product_size.bulkCreate(
                    sizeArray.map(s => ({
                        product_id: product.id,
                        size_id: s
                    })), { transaction : t}
                );
            }
        }

        // console.log("Product ID:", newProduct.id);
        // console.log("Colors:", colors);
        // console.log("Colors array:", colorsArray);
        await t.commit();
        return  res.status(200).json({product, message : "Product updated successfully.",success: true});
    }catch(err) {
        await t.rollback();
        console.error(err);
        return res.status(500).json({
            message: "Product creation failed"
        });
    }
}


exports.delete = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const product = await Products.findByPk(req.params.id,{
            include: ['images', 'sizes' , 'colors']
        });

        const getImages = product.images;
        const getColors = product.colors;
        const getSizes = product.sizes;
        if(getImages.length > 0){
            for (const image of getImages) {
                await product_images.destroy({
                    where: {id:image.id},
                })
                const folder = path.dirname(image.image);

                const folderPath = path.join("public", folder);

                await fs.remove(folderPath);
            }
        }
        if(getColors.length > 0){
            for(let color of getColors) {
                await product_colors.destroy({
                    where: {id:color.id},
                })
            }
        }

        if(getSizes.length > 0){
            for(let size of getSizes) {
                await product_size.destroy({where: {id:size.id}});
            }
        }

        await product.destroy();
        return res.status(200).json({product, message : "Brand removed successfully.",success: true});
    }catch(err) {
        console.error(err)
    }
}

