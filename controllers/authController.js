const {User} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const tokenBlacklist = require("../utils/tokenBlacklist");

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        //Find user by email
        const user = await User.findOne({where:{email}});
        if (!user) return res.status(401).send({error: 'Invalid credentials'});
        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send({error: 'Invalid credentials'});
        const token = jwt.sign({
            id:user.id,email:user.email
        },process.env.JWT_SECRET,{expiresIn: '1h'});
         res.status(200).json({token,user:{id:user.id, email:user.email, name:user.name}});

    }catch(err) {
        console.error(err)
    }
}

exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        //check if user alread exits
        const user = await User.findOne({where:{email}});
        if(user) return res.status(401).send({error: 'User already exists'});
         const newUser =await User.create({name, email,  password});
         res.status(200).json({newUser});
    }catch(err) {
        console.error(err)
    }
}

exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        //check if user alread exits
        const user = await User.findOne({where:{email}});
        if(!user) {
            return res.status(401).send({error: 'User not found'});
        };
        const resetToken= crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 3600000;
        await user.save();
        const resetLink = `http://localhost:8000/api/auth/reset-password/${resetToken}`;
        res.status(200).send({message:"Password reset link generated.", resetLink});

    }catch(err) {
        res.status(401).send({error: err.message});
    }
}

exports.resetPassword = async (req, res) => {
    console.log('get here')
    // const {password} = req.body;
        const {password} = req.body;
        const {token} = req.params;
        try {
            const user = await User.findOne({
                where: {
                    resetToken: token
                }
            });
            if (!user || user.resetTokenExpiry < Date.now()) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.resetToken = null;
            user.resetTokenExpiry = null;
            await user.save();
            res.json({
                message: "Password reset successful"
            });

        }catch(err) {
            res.status(401).send({error: err.message});
        }

}
exports.logout = async (req, res) => {
    try {
        const  authHeader = req.headers.authorization;
        if (!authHeader) return res.status(400).send({error: 'Unauthorized'});
        const token =authHeader.split(' ')[1];
        tokenBlacklist.push(token);
        res.status(200).json({message: 'Logout successfully'});

    }catch(err) {
        console.error(err)
    }
}


