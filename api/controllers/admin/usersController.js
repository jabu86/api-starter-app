const { User , Role , User_Role } = require("../../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = (page - 1) * limit;
    const where = {};

  if (search.trim()) {
      const searchTerm = search.trim();
      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${searchTerm}%`,
          },
        },

      ];
    }
    const { count, rows } = await User.findAndCountAll({
      attributes: {
        exclude: ["password", "resetToken", "resetTokenExpire"],
      },
      where,
      include: [
        {
          model: Role,
          through: {
            attributes: [],
          },
        },
      ],
      distinct: true,
      subQuery: false,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
  
    const totalPages = Math.ceil(count / limit);
    return res.status(200).json({
      users: rows,
      pagination: {
        currentPage: page,
        perPage: limit,
        totalItems: count,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: err, message: "Sever Error" });
  }
};

exports.assignRole = async (req, res) => {

  const { user_id, role_id } = req.body;
  try {
    const userRole = await User_Role.findOne({
      where: {
        user_id: user_id
      }
    });

    if (!userRole){
      return res.status(404).json({success:false, errors: "User not found" });
    }

    await User_Role.update(
        { role_id: role_id },
        { where: { user_id: user_id } }
    );
    
    return res
      .status(200)
      .json({
        userRole,
        message: "Role assigned successfully.",
        success: true,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: err, message: "Error assigning role" });
  }
};



exports.getRoles = async (req, res) => {

  try {
    const userRoles = await Role.findAll({
      order: [["name", "DESC"]],
    });
    if(userRoles.length > 0){
      return res.status(200).json({success: true, userRoles: userRoles});
    }

    return res
      .status(404)
      .send({ message: "Roles not found", success: false });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ errors: err, message: "Server Error" });
  }
};
/*
exports.delete = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    await brand.destroy();
    return res
      .status(200)
      .json({ brand, message: "Brand removed successfully.", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
};

*/
