const { Brand} = require('../../models');
const {body, validationResult} = require('express-validator');

exports.index = async (req, res) => {
    try {
        const brands = await Brand.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({brands, message:"Get Brands" , success: true});
    }catch(err) {
        console.error(err)
    }
}



exports.create =  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name } = req.body;
    try {
        const brand = await Brand.findOne({where:{name}});
        if(brand) return res.status(400).json({errors: 'Brand already exists'});
        const newCategory = await  Brand.create({
            name : name,
            image:`/brands/${req.file.filename}`

        });
        return  res.status(200).json({newCategory, message : "Brand created successfully." , success: true});
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
        return res.status(200).send({brand, message:"Brand updated successfully." ,success: true});
    }catch(err) {
        console.error(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        await brand.destroy();
        return res.status(200).json({brand, message : "Brand removed successfully." ,success: true});
    }catch(err) {
        console.error(err)
        return res.status(401).send({error: err.message});
    }
}

