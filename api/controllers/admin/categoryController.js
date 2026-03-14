const {User, Category, SubCategory} = require('../../models');
const {body, validationResult} = require('express-validator');

exports.index = async (req, res) => {
    try {
        const categories = await Category.findAll({
            order: [['createdAt', 'DESC']],
            include:"subCategory"
        });
        return res.status(200).json({categories, message:"Get Categories" });
    }catch(err) {
        console.error(err)
    }
}

exports.create =  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name} = req.body;
    try {
        const category = await Category.findOne({where:{name}});
        if(category) return res.status(400).json({errors: 'Category already exists'});
        const newCategory = await  Category.create({
            name : name
        });
        return  res.status(200).json({newCategory, message : "Category created successfully."});
    }catch(err) {
        console.error(err)
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name ,description} = req.body;
    const {id}= req.params;
    try {
        const category = await Category.findByPk(id,{
            include:"subCategory"
        });
        category.name = name;
        category.description = description;
        await  category.save()
        return res.status(200).send({category, message:"Category updated successfully."});
    }catch(err) {
        console.error(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        await category.destroy();
        return res.status(200).json({category, message : "Category removed successfully."});
    }catch(err) {
        console.error(err)
        return res.status(401).send({error: err.message});
    }
}

