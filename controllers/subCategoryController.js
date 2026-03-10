const {User} = require('../models');
exports.index = async (req, res) => {
    try {
        res.status(200).json({ message:"Get SUB Categories" });
    }catch(err) {
        console.error(err)
    }
}

exports.create = (req, res) => {
    try {
        res.status(200).json({message: "Create SUB Category"});
    }catch(err) {
        console.error(err)
    }
}

exports.update = (req, res) => {
    try {
        res.status(200).json({message: "UPDATE SUB Category"});
    }catch(err) {
        console.error(err)
    }
}

exports.delete = (req, res) => {
    try {
        res.status(200).json({message: "delete SUB Category"});
    }catch(err) {
        console.error(err)
    }
}

