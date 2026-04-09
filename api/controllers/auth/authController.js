const {User, User_Role, Role} = require('../../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const tokenBlacklist = require("../../utils/tokenBlacklist");

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        //Find user by email
        const user = await User.findOne({where:{email},
            include: {
                model: Role,
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }
        });
        if (!user)  return res.status(400).json({errors: [{
                type: "field",
                value: req.body.email,
                msg: "Invalid credentials",
                path: "email",
                location: "body"
            }]
        });
        //Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({errors: [{
                type: "field",
                value: req.body.email,
                msg: "Invalid credentials",
                path: "email",
                location: "body"
            }]
        });

        const roles = user.Roles.map(role => role.name);

        const loginUser = {
            email: user.email,
            name: user.name,
            roles
        }
        const token = jwt.sign({
            id:user.id,
            name: user.name,
            email:user.email,
            roles,
        },process.env.JWT_SECRET,{expiresIn: '1h'});
        return res.status(201).json({token,user:loginUser , success:true});

    }catch(err) {
        console.error(err)
        return res.status(401).send({error: err.message});
    }
}

exports.register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({name, email,  password});
        const assignRole = await User_Role.create({
            user_id: user.id,
            role_id: 3,
        });
        return  res.status(201).json({user, assignRole , success: true});
    }catch(err) {
        console.error(err)
        return res.status(401).json({errors: err , message: "Sever Error"});
    }
}

exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        //check if user alread exits
        const user = await User.findOne({where:{email}});
        if(!user) {
            return res.status(400).json({errors: [{
                    type: "field",
                    value: req.body.email,
                    msg: "E-mail address not found",
                    path: "email",
                    location: "body"
                }]
            });;
        };
        const resetToken= crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 3600000;
        await user.save();
        const resetLink = `${process.env.URL}:${process.env.PORT}/api/auth/reset-password/${resetToken}`;
        return  res.status(200).send({message:"Password reset link generated.", resetLink,token:resetToken,success: true});

    }catch(err) {
        return res.status(401).json({errors: err , message: "Sever Error"});
    }
}

exports.resetPassword = async (req, res) => {

    const {password} = req.body;
    const {token} = req.params;
    try {
        const user = await User.findOne({
            where: {
                resetToken: token
            }
        });
        if (!user || user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({errors: [{
                    type: "field",
                    value: req.body.password,
                    msg: "Invalid token or token expired",
                    path: "password",
                    location: "body"
                }]
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
        return  res.json({
            message: "Password reset successful",
            success: true
        });

    }catch(err) {
        return res.status(401).json({errors: err , message: "Sever Error"});
    }

}

exports.logout = async (req, res) => {
    try {
        const  authHeader = req.headers.authorization;
        if (!authHeader) return res.status(400).send({error: 'Unauthorized'});
        const token =authHeader.split(' ')[1];
        tokenBlacklist.push(token);
        return res.status(200).json({message: 'Logout successfully' ,success:true});

    }catch(err) {
        console.error(err)
        return res.status(401).json({errors: err , message: "Sever Error"});
    }
}


