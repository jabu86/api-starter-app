const {User} = require('../models');
exports.index = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({user, message:"Login Success"});
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

