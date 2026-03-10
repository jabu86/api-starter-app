const {User} = require('../models');
exports.index = async (req, res) => {
    try {
        res.status(200).json({ message:"Get Categories" });
    }catch(err) {
        console.error(err)
    }
}

exports.create = (req, res) => {
    try {
        res.status(200).json({message: "Create Category"});
    }catch(err) {
        console.error(err)
    }
}

exports.update = (req, res) => {
    try {
        res.status(200).json({message: "UPDATE Category"});
    }catch(err) {
        console.error(err)
    }
}

exports.delete = (req, res) => {
    try {
        res.status(200).json({message: "delete Category"});
    }catch(err) {
        console.error(err)
    }
}

