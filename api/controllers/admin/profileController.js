const {User , Profile} = require('../../models');
const {logout} = require("../auth/authController");
const {where} = require("sequelize");
const bcrypt = require("bcrypt");
exports.index = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'email', 'name'],
            include: "profile",

        });
        res.status(200).json({user, message:"Profile"});
    }catch(err) {
        console.error(err)
    }
}

exports.profileUpdate =async (req, res) => {

    const {name, email, bio} = req.body;
    const user_id = req.user.id;

    try{
        const user = await User.findOne({
            where:{id : user_id},
            include: "profile"
        });
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        user.name = name;
        user.email = email;
        user.save();
        const profile = await Profile.findOne({
            where:{user_id : user.id},
            include: "user"
        });

       
        if(!profile){
            //CREATE PROFILE
             const newProfile =await Profile.create({
                user_id : user.id,
                bio : bio,
                image : req.file ? `/profile/${req.file.filename}` : `/profile/profile.png`,
            });
            return res.status(200).json({ user, message:"Profile created successfully"});
        }else{
           
            profile.bio = bio;
            let image  = "";      

            profile.image = req.file ? `/profile/${req.file.filename}` : profile.image;
            profile.save();
            return res.status(200).send({ user, message:"Profile updated successfully"});
        }
    }catch(err) {
        console.error(err)
        return res.status(400).json({message:"Error occured"});
    }
}

exports.profilePasswordReset =async (req, res) => {

    const {password, confirmPassword, } = req.body;
    const user_id = req.user.id;as
  
    try{
        const user = await User.findOne({
            where:{id : user_id},
        });
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

         const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
         
        user.save();
        return res.status(200).send({ user, message:"Password updated successfully"});
      
    }catch(err) {
        console.error(err)
        return res.status(400).json({message:"Error occured"});
    }
}