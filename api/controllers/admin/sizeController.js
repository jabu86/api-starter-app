const {Sizes} = require('../../models');
const {body, validationResult} = require('express-validator');

exports.index = async (req, res) => {
    try {
        const sizes = await Sizes.findAll({
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({sizes, message:"Get Categories", success: true });
    }catch(err) {
        console.error(err)
        return  res.status(500).json({message: 'Server Error', error: err});
    }
}

exports.create =  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {size} = req.body;
    try {
        const sizes = await Sizes.findOne({where:{size}});

        if(sizes) return res.status(400).json({errors: [{
                type: "field",
                value: req.body.size,
                msg: "Size already exists",
                path: "size",
                location: "body"
            }]
        });
        const newSize = await  Sizes.create({
            size:size
        });
        return  res.status(200).json({newSize, message : "Size created successfully.", success: true });
    }catch(err) {
        console.error(err)
        return res.status(500).json({message: 'Server Error', error: err});
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {size} = req.body;
    const {id}= req.params;
    try {
        const getSize = await Sizes.findByPk(id);
        getSize.size = size;

        await  getSize.save()
        return res.status(200).send({getSize, message:"Size updated successfully." , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({message: 'Server Error', error: err});
    }
}

exports.delete = async (req, res) => {
    try {
        const size = await Sizes.findByPk(req.params.id);
        await size.destroy();
        return res.status(200).json({size, message : "Size removed successfully." , success: true});
    }catch(err) {
        console.error(err)
        return res.status(500).json({message:"Server Error", error: err});
    }
}

