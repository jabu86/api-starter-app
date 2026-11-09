const { Brand } = require("../../models");
const { body, validationResult } = require("express-validator");
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
          slug: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      ];
    }
    const { count, rows } = await Brand.findAndCountAll({
      where,
      distinct: true,
      subQuery: false,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    // console.log(rows)
    const totalPages = Math.ceil(count / limit);
    return res.status(200).json({
      brands: rows,
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
    // return res.status(200).json({brands, message:"Get Brands" , success: true});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: err, message: "Sever Error" });
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  try {
    const brand = await Brand.findOne({ where: { name } });
    if (brand) return res.status(400).json({ errors: "Brand already exists" });
    const newCategory = await Brand.create({
      name: name,
      image: `/brands/${req.file.filename}`,
    });
    return res
      .status(200)
      .json({
        newCategory,
        message: "Brand created successfully.",
        success: true,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: err, message: "Sever Error" });
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, id } = req.body;
  try {
    const brand = await Brand.findByPk(id);
    brand.name = name;
    brand.image = `/brands/${req.file.filename}`;
    await brand.save();
    return res
      .status(200)
      .send({ brand, message: "Brand updated successfully.", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ errors: err, message: "Server Error" });
  }
};

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
