const {User , SubCategory, Category} = require('../../models');
const {body, validationResult} = require('express-validator');
exports.index = async (req, res) => {
    try {
        const subCategory = await SubCategory.findAll({
            order: [['createdAt', 'DESC']],
            include:"category"
        });
        return  res.status(200).json({subCategory, message:"Get SUB Categories" ,success: true });
    }catch(err) {
        console.error(err)
        return res.status(500).json({message:"Error getting sub categories: ", error: err});
    }
}


exports.create = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name, category_id, description} = req.body;
    try {
        const subCategory = await SubCategory.findOne({where:{name}});
        if(subCategory) return res.status(400).send({errors: [{
                type: "field",
                value: req.body.name,
                msg: "Sub category already exists",
                path: "name",
                location: "body"
            }]
        });
        const newSubCategory = await SubCategory.create({
            name, category_id,description
        });
        return  res.status(201).json({newSubCategory,message: "Sub category created successfully." , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({message:"Error creating Sub category create." , error: err});
    }
}

exports.update = async (req, res) => {

    const {name ,description} = req.body;
    const {id}= req.params;
    try {
        const category = await SubCategory.findByPk(id,{
            include:"category"
        });
        category.name = name;
        category.description = description;
        await  category.save()
        return res.status(201).send({category, message:"SubCategory updated successfully." , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({message:"Error creating Sub category create." , error: err});
    }
}

exports.delete = async (req, res) => {
    try {
        const category = await SubCategory.findByPk(req.params.id);
        await category.destroy();
        return res.status(201).json({category, message : "Sub category removed successfully.", success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).send({error: err.message , message : "Server Error"});
    }
}

