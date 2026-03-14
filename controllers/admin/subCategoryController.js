const {User , SubCategory, Category} = require('../../models');
const {body, validationResult} = require('express-validator');
exports.index = async (req, res) => {
    try {
        const subCategory = await SubCategory.findAll({
            order: [['createdAt', 'DESC']],
            include:"category"
        });
        return  res.status(200).json({subCategory, message:"Get SUB Categories" });
    }catch(err) {
        console.error(err)
    }
}


exports.create = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, category_id} = req.body;
    try {
        const subCategory = await SubCategory.findOne({where:{name}});
        if(subCategory) return res.status(400).send({errors: 'Sub category already exists.'});
        const newSubCategory = await SubCategory.create({
            name, category_id,
        });
        return  res.status(200).json({newSubCategory,message: "Sub category created successfully."});
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
        const category = await SubCategory.findByPk(id,{
            include:"category"
        });
        category.name = name;
        category.description = description;
        await  category.save()
        return res.status(200).send({category, message:"SubCategory updated successfully."});
    }catch(err) {
        console.error(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const category = await SubCategory.findByPk(req.params.id);
        await category.destroy();
        return res.status(200).json({category, message : "Sub category removed successfully."});
    }catch(err) {
        console.error(err)
        return res.status(401).send({error: err.message});
    }
}

