const { User, Category, SubCategory } = require("../../models");
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
          description: {
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
    const { count, rows } = await Category.findAndCountAll({
      where,
      distinct: true,
      subQuery: false,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      // include: "subCategory",
    });
    
    
    const totalPages = Math.ceil(count / limit);
    return res.status(200).json({
      categories: rows,
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

    // return res.status(200).json({categories, message:"Get Categories", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err });
    console.error(err);
  }
};

exports.category = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";    
  
    const category = await Category.findOne({
      where: { slug: req.params.slug },
      include: "subCategory",
    });

    if (!category) {
      return res.status(404).json({ message: "Not Found" });
    }

    const where = { category_id:category.id};
    if (search.trim()) {
      const searchTerm = search.trim();
      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        {
          description: {
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

    const { count, rows } = await SubCategory.findAndCountAll({
      where,
      distinct: true,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalPages = Math.ceil(count / limit);
    // Add the paginated subcategories to the existing category
    category.setDataValue("subCategory", rows);
    return res.status(200).json({
      category,
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

    // return res.status(200).json({category, message:"Get Categories ssssss", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
};

exports.create = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = await Category.create({
      name,
      description,
    });
    return res
      .status(201)
      .json({
        newCategory,
        message: "Category created successfully.",
        success: true,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error creating categories", error: err });
  }
};

exports.update = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id, {
      include: "subCategory",
    });
    category.name = name;
    category.description = description;
    await category.save();
    return res
      .status(201)
      .send({
        category,
        message: "Category updated successfully.",
        success: true,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating category", error: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    await category.destroy();
    return res
      .status(201)
      .json({
        category,
        message: "Category removed successfully.",
        success: true,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ error: err, message: "Error deleting category" });
  }
};
