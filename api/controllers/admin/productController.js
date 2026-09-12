const {
  Products,
  product_images,
  product_colors,
  product_size,
  sub_category_product,
  Category,
  Brand,
} = require("../../models");
const { body, validationResult } = require("express-validator");
const sequelize = require("../../config/database");
const fs = require("fs-extra");
const path = require("path");
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
        {
          "$category.name$": {
            [Op.like]: `%${searchTerm}%`,
          },
        },
        {
          "$brand.name$": {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      ];
    }

    const { count, rows } = await Products.findAndCountAll({
      where,
      distinct: true,
      subQuery: false,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Category,
          as: "category",
          required: false,
        },

        {
          model: Brand,
          as: "brand",
          required: false,
        },
        {
          model: product_images,
          as: "images",
          separate: true,
        },

        {
          model: product_colors,
          as: "colors",
          separate: true,
        },

        {
          model: product_size,
          as: "sizes",
          separate: true,
        },

        {
          model: sub_category_product,
          as: "sub_category_products",
          separate: true,
        },
      ],
    });
    // console.log(rows)
    const totalPages = Math.ceil(count / limit);
    return res.status(200).json({
      products: rows,
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
    return res.status(500).json({
      message: "Getting Product Error: ",
      err,
    });
  }
};

exports.create = async (req, res) => {
  const {
    name,
    description,
    price,
    category_id,
    sub_category_id,
    brand_id,
    quantity,
    in_stock,
    active,
    colors,
    size,
  } = req.body;
  const activeImage = req.body.active_image_index
    ? JSON.parse(req.body.active_image_index)
    : null;
  const t = await sequelize.transaction();
  try {
    const newProduct = await Products.create(
      {
        name: name,
        category_id: category_id,
        brand_id: brand_id,
        description: description,
        price: price,
        quantity: quantity,
        in_stock: in_stock,
        active: active,
      },
      { transaction: t },
    );

    if (sub_category_id) {
      const productSubCategoryArray = Array.isArray(sub_category_id)
        ? sub_category_id.flatMap((c) => c.split(","))
        : sub_category_id.split(",");
      const validProductSubCategory = productSubCategoryArray.filter(
        (c) => c && c !== "0",
      );

      if (validProductSubCategory.length > 0) {
        await sub_category_product.bulkCreate(
          validProductSubCategory.map((proSubCat) => ({
            product_id: newProduct.id,
            category_id: category_id,
            sub_category_id: proSubCat,
          })),
          { transaction: t },
        );
      }
    }

    if (req.processedImages && req.processedImages.length > 0) {
      for (const [index, image] of req.processedImages.entries()) {
        const isActive =
          activeImage?.type === "new" && index === activeImage?.value;

        await product_images.create(
          {
            product_id: newProduct.id,
            image: image.image,
            thumbnail: image.thumbnail,
            active: isActive,
          },
          { transaction: t },
        );
      }
    }

    if (colors) {
      const colorsArray = Array.isArray(colors)
        ? colors.flatMap((c) => c.split(","))
        : colors.split(",");

      const validColors = colorsArray.filter((c) => c && c !== "0");
      if (validColors.length > 0) {
        await product_colors.bulkCreate(
          colorsArray.map((color) => ({
            product_id: newProduct.id,
            color_id: color,
          })),
          { transaction: t },
        );
      }
    }

    if (size) {
      const sizeArray = Array.isArray(size)
        ? size.flatMap((s) => s.split(","))
        : size.split(",");

      const validSizes = sizeArray.filter((s) => s && s !== "0");
      if (validSizes.length > 0) {
        await product_size.bulkCreate(
          sizeArray.map((s) => ({
            product_id: newProduct.id,
            size_id: s,
          })),
          { transaction: t },
        );
      }
    }

    // console.log("Product ID:", newProduct.id);
    // console.log("Colors:", colors);
    // console.log("Colors array:", colorsArray);
    await t.commit();

    //Get create product
    const product = await Products.findByPk(newProduct.id, {
      include: ["category", "brand", "images", "sizes", "colors"],
    });
    return res.status(201).json({
      product,
      message: "Product created successfully.",
      success: true,
    });
  } catch (err) {
    if (!t.finished) {
      await t.rollback();
    }

    return res.status(500).json({
      message: "Product creation failed",
      err,
    });
  }
};

exports.update = async (req, res) => {
  const {
    name,
    description,
    price,
    category_id,
    brand_id,
    sub_category_id,
    quantity,
    in_stock,
    active,
    colors,
    size,
  } = req.body;
  const activeImage = req.body.active_image_index
    ? JSON.parse(req.body.active_image_index)
    : null;

  const t = await sequelize.transaction();
  try {
    const product = await Products.findByPk(req.params.id, {
      include: ["category", "brand", "images", "sizes", "colors"],
    });
    product.name = name;
    product.category_id = category_id;
    product.brand_id = brand_id;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.in_stock = in_stock;
    product.active = active;
    await product.save();

    const getProductSubCategory = await sub_category_product.findAll({
      where: { product_id: product.id },
    });

    if (getProductSubCategory.length > 0) {
      for (let subCategory of getProductSubCategory) {
        await sub_category_product.destroy({
          where: { product_id: product.id },
        });
      }
    }
    if (sub_category_id) {
      const productSubCategoryArray = Array.isArray(sub_category_id)
        ? sub_category_id.flatMap((c) => c.split(","))
        : sub_category_id.split(",");
      const validProductSubCategory = productSubCategoryArray.filter(
        (c) => c && c !== "0",
      );

      if (validProductSubCategory.length > 0) {
        await sub_category_product.bulkCreate(
          validProductSubCategory.map((proSubCat) => ({
            product_id: product.id,
            category_id: category_id,
            sub_category_id: proSubCat,
          })),
          { transaction: t },
        );
      }
    }

    await product_images.update(
      { active: false },
      { where: { product_id: product.id }, transaction: t },
    );

    if (activeImage?.type === "existing") {
      await product_images.update(
        { active: true },
        {
          where: {
            id: activeImage.value,
            product_id: product.id,
          },
          transaction: t,
        },
      );
    }

    if (req.processedImages && req.processedImages.length > 0) {
      if (req.processedImages && req.processedImages.length > 0) {
        for (const [index, image] of req.processedImages.entries()) {
          const isActive =
            activeImage?.type === "new" && index === activeImage.value;

          // console.log("NEW IMAGE LOOP HIT");
          // console.log("index:", index);
          // console.log("isActive:", isActive);

          await product_images.create(
            {
              product_id: product.id,
              image: image.image,
              thumbnail: image.thumbnail,
              active: isActive,
            },
            { transaction: t },
          );
        }
      }
    }

    if (colors) {
      const getColors = await product_colors.findAll({
        where: { product_id: product.id },
      });
      if (getColors) {
        if (getColors.length > 0) {
          for (let color of getColors) {
            await product_colors.destroy({
              where: { product_id: product.id },
            });
          }
        }
      }
      const colorsArray = Array.isArray(colors)
        ? colors.flatMap((c) => c.split(","))
        : colors.split(",");

      const validColors = colorsArray.filter((c) => c && c !== "0");
      if (validColors.length > 0) {
        await product_colors.bulkCreate(
          colorsArray.map((color) => ({
            product_id: product.id,
            color_id: color,
          })),
          { transaction: t },
        );
      }
    }

    if (size) {
      const getSizes = await product_size.findAll({
        where: { product_id: product.id },
      });
      if (getSizes) {
        if (getSizes) {
          for (let size of getSizes) {
            await product_size.destroy({ where: { product_id: product.id } });
          }
        }
      }
      const sizeArray = Array.isArray(size)
        ? size.flatMap((s) => s.split(","))
        : size.split(",");

      const validSizes = sizeArray.filter((s) => s && s !== "0");
      if (validSizes.length > 0) {
        await product_size.bulkCreate(
          sizeArray.map((s) => ({
            product_id: product.id,
            size_id: s,
          })),
          { transaction: t },
        );
      }
    }

    // console.log("Product ID:", newProduct.id);
    // console.log("Colors:", colors);
    // console.log("Colors array:", colorsArray);
    await t.commit();
    return res.status(201).json({
      product,
      message: "Product updated successfully.",
      success: true,
    });
  } catch (err) {
    await t.rollback();

    return res.status(500).json({
      message: "Product creation failed",
      err,
    });
  }
};

exports.delete = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const product = await Products.findByPk(req.params.id, {
      include: ["images", "sizes", "colors", "sub_category_products"],
    });

    const getImages = product.images;
    const getColors = product.colors;
    const getSizes = product.sizes;
    const subCategoryProducts = product.sub_category_products;
    if (subCategoryProducts.length > 0) {
      for (let subCatPro of subCategoryProducts) {
        await sub_category_product.destroy({
          where: { id: subCatPro.id },
        });
      }
    }
    if (getImages.length > 0) {
      for (const image of getImages) {
        await product_images.destroy({
          where: { id: image.id },
        });
        const folder = path.dirname(image.image);

        const folderPath = path.join("public", folder);

        await fs.remove(folderPath);
      }
    }
    if (getColors.length > 0) {
      for (let color of getColors) {
        await product_colors.destroy({
          where: { id: color.id },
        });
      }
    }

    if (getSizes.length > 0) {
      for (let size of getSizes) {
        await product_size.destroy({ where: { id: size.id } });
      }
    }

    await product.destroy();
    return res.status(201).json({
      product,
      message: "Product removed successfully.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Product removal failed",
      err,
    });
  }
};

exports.deleteImage = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const image = await product_images.findByPk(req.params.id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
        success: false,
      });
    }
    if (image.image) {
      const filePath = path.join(
        __dirname,
        __dirname,
        "..", // 👈 IMPORTANT (go up from controller folder)
        "public",
        "images",
        "products",
        path.basename(image.image),
      );
      try {
        const exists = await fs.exists(filePath);
        if (exists) {
          await fs.remove(filePath);
        } else {
          console.log("File not found, skipping:", filePath);
        }
      } catch (err) {
        return res.status(400).json({
          message: "Error deleting image:",
          err,
        });
      }
    }
    await image.destroy();
    return res.status(201).json({
      image,
      message: "Product image removed successfully.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "image removal failed",
      err,
    });
  }
};
