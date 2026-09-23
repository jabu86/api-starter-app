const { Op } = require("sequelize");

const {
  Category,
  Brand,
  product_images,
  Products,
  Sizes,
  Colors,
} = require("../models");

exports.index = async (req, res) => {
  try {
    res.status(200).json({ message: "Index Page Like the Home Page" });
  } catch (err) {
    console.error(err);
  }
};

exports.home = (req, res) => {
  try {
    res.status(200).json({ message: "Home api contoller" });
  } catch (err) {
    console.error(err);
  }
};

exports.about = (req, res) => {
  try {
    res.status(200).json({ message: "About api contoller" });
  } catch (err) {
    console.error(err);
  }
};

exports.contact = (req, res) => {
  try {
    res.status(200).json({ message: "Contact us api contoller" });
  } catch (err) {
    console.error(err);
  }
};

exports.products = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const sort = req.query.sort || "";
    const size = req.query.size || "";
    const offset = (page - 1) * limit;

    // ---------------------------------------
    // 1. FIND PRODUCTS THAT MATCH SIZE
    // ---------------------------------------
    let sizeProductIds = null;

    if (size) {
      const sizeProducts = await Products.findAll({
        attributes: ["id"],
        include: [
          {
            model: Sizes,
            as: "sizes",
            attributes: [],
            through: {
              attributes: [],
            },
            where: {
              slug: size,
            },
            required: true,
          },
        ],
      });

      sizeProductIds = sizeProducts.map((product) => product.id);

      console.log("Matching product IDs:", sizeProductIds);
    }
    // ---------------------------------------
    // 2. BUILD PRODUCT WHERE
    // ---------------------------------------

    const productWhere = {
      active: true,
    };

    if (search.trim()) {
      const searchTerm = search.trim();
      productWhere[Op.or] = [
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
          price: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      ];
    }

    if (sizeProductIds !== null) {
      productWhere.id = sizeProductIds;
    }

    let order = [["id", "DESC"]];

    if (sort === "lowest") {
      order = [["price", "ASC"]];
    }

    if (sort === "highest") {
      order = [["price", "DESC"]];
    }
    // console.log(sort , 'sort')
    // console.log(size , 'size')

    const { count, rows: productIds } = await Products.findAndCountAll({
      where: productWhere,
      attributes: ["id"],
      limit,
      offset,
      order,
      distinct: true,
    });

    // 2. Extract IDs
    const ids = productIds.map((product) => product.id);

    // 3. Get the actual products + relationships
    const rows = await Products.findAll({
      where: {
        id: ids,
        active: true,
      },
      order,
      include: [
        {
          model: Category,
          as: "category",
        },

        {
          model: Brand,
          as: "brand",
        },

        {
          model: product_images,
          as: "images",
          where: {
            active: true,
          },
          required: false,
        },

        {
          model: Colors,
          as: "colors",
          through: {
            attributes: [],
          },
        },

        {
          model: Sizes,
          as: "sizes",
          through: {
            attributes: [],
          },
        },
      ],
    });

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

exports.product = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: Brand,
          as: "brand",
        },
        {
          model: product_images,
          as: "images",

          required: false,
        },
        {
          model: Colors,
          as: "colors",
          through: {
            attributes: [],
          },
        },
        {
          model: Sizes,
          as: "sizes",
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({ product, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
