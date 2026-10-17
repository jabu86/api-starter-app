const { User, Profile, ShippingAddress, Order } = require("../../models");
const { logout } = require("../auth/authController");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");
exports.index = async (req, res) => {
  try {
    // console.log(req.user);

    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "name"],
      include: "profile",
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, message: "Profile", success: true });
  } catch (err) {
    // console.error(err);
    return res
      .status(500)
      .json({ message: "Error loading user profile", success: false, err });
  }
};

exports.profileUpdate = async (req, res) => {
  const { name, email, bio } = req.body;
  const user_id = req.user.id;
  try {
    const user = await User.findOne({
      where: { id: user_id },
      include: "profile",
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.name = name;
    user.email = email;
    user.save();
    const profile = await Profile.findOne({
      where: { user_id: user.id },
      include: "user",
    });

    if (!profile) {
      //CREATE PROFILE
      const newProfile = await Profile.create({
        user_id: user.id,
        bio: bio,
        image: req.file
          ? `/profile/${req.file.filename}`
          : `/profile/profile.png`,
      });
      return res
        .status(200)
        .json({ user, message: "Profile created successfully", newProfile });
    } else {
      profile.bio = bio;
      let image = "";

      profile.image = req.file
        ? `/profile/${req.file.filename}`
        : profile.image;
      profile.save();
      return res
        .status(200)
        .send({ user, message: "Profile updated successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error occured" });
  }
};

exports.profilePasswordReset = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const user_id = req.user.id;
  as;

  try {
    const user = await User.findOne({
      where: { id: user_id },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.save();
    return res
      .status(200)
      .send({ user, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error occured" });
  }
};

exports.deleteUserAccount = async (req, res) => {
  //delete user
  //delete user profile
  //user shipping address
  //user order

  try {
    //check if user is logged in user
    if (parseFloat(req.params.user_id) !== parseInt(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Unauthorized to delete user info", success: false });
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "name"],
      include: ["profile", "orders", "shippingAddresses"],
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    //get user profile & remove user profile
    const profile = await Profile.findByPk(user.profile.id);
    // await profile.destroy();

    //get user shipping address and remove
    // console.log(user.shippingAddresses);
    // for (const address of user.shippingAddresses) {
    //   await ShippingAddress.destroy({
    //     where: { id: address.id },
    //   });
    // }

    //get orders and remove user orders
    // console.log(user.orders);
    // for (const order of user.orders) {
    //   await Order.destroy({
    //     where: { id: order.id },
    //   });
    // }

    //delete user

    // await user.destroy();

    return res.status(200).json({
      message: "User account removed successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error occured removing user account" });
  }
};
