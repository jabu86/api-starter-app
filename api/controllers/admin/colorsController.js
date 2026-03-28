const {Colors} = require('../../models');
const {body, validationResult} = require('express-validator');

exports.index = async (req, res) => {
    try {
        const colors = await Colors.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({colors, message:"Get Categories" , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({error: err , message: "Server Error"});
    }
}

exports.create =  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name} = req.body;
    try {
        const color = await Colors.findOne({where:{name}});
        if(color) return res.status(400).json({errors: [{
                type: "field",
                value: req.body.name,
                msg: "Color already exists",
                path: "name",
                location: "body"
            }]
        });
        const newCategory = await  Colors.create({
            name : name
        });
        return  res.status(200).json({newCategory, message : "Color created successfully." , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({error: err , message: "Server Error"});
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {name} = req.body;
    const {id}= req.params;
    try {
        const color = await Colors.findByPk(id);
        color.name = name;

        await  color.save()
        return res.status(200).send({color, message:"Color updated successfully." , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({error: err , message: "Server Error"});
    }
}

exports.delete = async (req, res) => {
    try {
        const color = await Colors.findByPk(req.params.id);
        await color.destroy();
        return res.status(200).json({color, message : "Color removed successfully." , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({error: err , message: "Server Error"});
    }
}

