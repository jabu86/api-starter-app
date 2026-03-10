const {User , Profile} = require('../models');
const {logout} = require("./authController");
exports.index = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({user, message:"Profile User"});
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
             await Profile.create({
                user_id : user.id,
                bio : bio,
                image : `/images/${req.file.filename}`,
            });
            return res.status(200).json({ profile, message:"Profile created successfully"});
        }else{
            profile.bio = bio;
            profile.image = `/images/${req.file.filename}`;
            profile.save();
            return res.status(200).send({ profile, message:"Profile updated successfully"});
        }
    }catch(err) {
        console.error(err)
        return res.status(400).json({message:"Error occured"});
    }
}