const {User , Products} = require('../models');
exports.index = async (req, res) => {
    try {
        res.status(200).json({ message:"Index Page Like the Home Page" });
    }catch(err) {
        console.error(err)
    }
}

exports.home = (req, res) => {
    try {
        res.status(200).json({message: "Home api contoller"});
    }catch(err) {
        console.error(err)
    }
}


exports.about = (req, res) => {
    try {
        res.status(200).json({message: "About api contoller"});
    }catch(err) {
        console.error(err)
    }
}


exports.contact = (req, res) => {
    try {
        res.status(200).json({message: "Contact us api contoller"});
    }catch(err) {
        console.error(err)
    }
}


exports.shop =  async(req, res) => {
     try {
        const products = await Products.findAll({
            order: [['createdAt', 'DESC']],
            include: ['category', 'brand','images', 'sizes' , 'colors' ],
        });
        return res.status(200).json({products, message:"Get Products" , success: true });
    }catch(err) {
        console.error(err)
        return res.status(500).json({
            message: "Getting Product Error: ",err
        });
    }
}

