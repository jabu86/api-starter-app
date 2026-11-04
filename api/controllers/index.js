const { Op, literal } = require("sequelize");

const {
  Category,
  Brand,
  product_images,
  Products,
  Sizes,
  Colors,
  Reviews,
  OrderItem,
  Order
} = require("../models");
const sequelize = require("../config/database");

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

//@desc  Get category with sub categories
//@route POST /api/category
//@access Public
exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: ["subCategory"],
      order: [["name", "ASC"]],
    });

    if (!categories) {
      return res.status(404).json({
        message: "Category not found: ",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category found successfull. ",
      categories,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Getting categoy Error: ",
      err,
    });
  }
};

//@desc  Get brands
//@route POST /api/brands
//@access Public

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({
      order: [["name", "ASC"]],
    });
    if (!brands) {
      return res.status(404).json({
        message: "Brand not found: ",
        success: false,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Brand found successfull. ", brands });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Getting brand Error: ",
      err,
    });
  }
};

//@desc  Get products , filter by category, sub category, size, sort and search
//@route POST /api/shop
//@access Public
exports.products = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = (req.query.search || "").trim();
    const sort = (req.query.sort || "").trim(); // Get sort parameter from query
    const size = req.query.size || "";
    const offset = (page - 1) * limit;
    const categoryName = (req.query.category || "").trim(); // Get category name from query parameter
    const subCategoryId = (req.query.subCategoryId || "").trim(); // Get sub category id from query parameter
    // const subCategoryName = (req.query.subCategory || "").trim(); // Get sub category name from query parameter
    const brandName = (req.query.brand || "").trim(); // Get brand name from query parameter

    // return console.log("Query Parameters:", {
    //   page,
    //   limit,
    //   search,
    //   sort,
    //   size,
    //   categoryName,
    // subCategoryId,
    // subCategoryName,
    // });

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

      // console.log("Matching product IDs:", sizeProductIds);
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
          price: sequelize.where(
            sequelize.cast(sequelize.col("price"), "TEXT"),
            {
              [Op.like]: `%${searchTerm}%`,
            },
          ),
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

    //get category relationships and filter by category name if provided
    //get sub category relationships and filter by product sub-category name if provided
    const filterIncludes = [];

    if (categoryName) {
      filterIncludes.push({
        association: "category",
        attributes: [],
        where: {
          name: categoryName,
        },
        required: true,
      });
    }

    if (subCategoryId) {
      filterIncludes.push({
        association: "sub_category_products",
        attributes: [],
        where: {
          sub_category_id: Number(subCategoryId),
        },
        required: true,
      });
    }

    if (brandName) {
      filterIncludes.push({
        association: "brand",
        attributes: [],
        where: {
          name: brandName,
        },
        required: true,
      });
    }

    // ---------------------------------------
    // 3. FIND AND COUNT PRODUCTS
    // ---------------------------------------
    const { count, rows: productIds } = await Products.findAndCountAll({
      where: productWhere,
      attributes: ["id"],
      include: filterIncludes,
      limit,
      offset,
      order,
      distinct: true,
      subQuery: false, // Ensure proper handling of the include with limit and offset
    });

    // 2. Extract IDs
    const ids = productIds.map((product) => product.id);
    // console.log(productIds);

    //get average ratings for all the products
    const ratings = await Reviews.findAll({
      attributes: [
        "product_id",
        [
          sequelize.fn(
            "AVG",
            sequelize.cast(sequelize.col("ratings"), "INTEGER"),
          ),
          "averageRating",
        ],
        [sequelize.fn("COUNT", sequelize.col("id")), "totalReviews"],
      ],
      where: {
        product_id: ids,
      },
      group: ["product_id"],
      raw: true,
    });

    const ratingMap = {};
    ratings.forEach((rating) => {
      ratingMap[rating.product_id] = {
        averageRating: Number(rating.averageRating),
        totalReviews: Number(rating.totalReviews),
      };
    });

    //Get the actual products + relationships
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
        // {
        //   model: Reviews,
        //   as: "reviews",
        // },

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

    const productsWithRatings = rows.map((product) => {
      const rating = ratingMap[product.id];

      return {
        ...product.toJSON(),
        averageRating: rating?.averageRating ?? 0,
        totalReviews: rating?.totalReviews ?? 0,
      };
    });

    const totalPages = Math.ceil(count / limit);
    return res.status(200).json({
      products: productsWithRatings,
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

//@desc  Get single products
//@route POST /api/shop/slug
//@access Public
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

    //calculate product ratings
    // Calculate product ratings
    const ratingStats = await Reviews.findOne({
      where: {
        product_id: product.id,
      },
      attributes: [
        [
          sequelize.fn(
            "AVG",
            sequelize.cast(sequelize.col("ratings"), "INTEGER"),
          ),
          "averageRating",
        ],
        [sequelize.fn("COUNT", sequelize.col("id")), "totalReviews"],
      ],
      raw: true,
    });
    return res.status(200).json({
      success: true,
      product,
      averageRating: Number(ratingStats?.averageRating || 0),
      totalReviews: Number(ratingStats?.totalReviews || 0),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

//@desc  Get latest products
//@route GET /api/latest
//@access Public
exports.getLatestProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { active: true },
      include: [
        {
          model: product_images,
          as: "images",
          where: { active: true },
          required: false,
        },
        // { model: Category, as: "category" },
        // { model: Brand, as: "brand" },
      ],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No latest products found",
      });
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve latest products",
    });
  }
};

// @desc  Get featured brands
// @route GET /api/featured-brands
// @access Public
exports.featuredBrands = async (req, res) => {
  try {
    //Get all brands and order by name ascending
    const brands = await Brand.findAll();
    //check if brands is empty or null and return a message if it is
    if (!brands || brands.length === 0) {
      return res.status(200).json({
        message: "Brands not found.",

        brands: null,
        success: false,
      });
    }
    return res.status(200).json({
      hasAddress: true,
      brands,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error loading brands",
      error: error,
    });
  }
};

//@desc  Get top rated products
//@route GET /api/top-rated
//@access Public
exports.getTopRatedProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { active: true },
      id:{
        [Op.in]: sequelize.literal(`(
          SELECT product_id
          FROM "Reviews"
          GROUP BY product_id
          ORDER BY AVG(CAST(ratings AS INTEGER)) DESC
          LIMIT 5
        )`),
      },
      include: [ 
        {
          model: product_images,
          as: "images",
          where: { active: true },
          required: false,
        },
       ],
        order: [
        [
          literal(`(
            SELECT AVG(CAST(r.ratings AS NUMERIC))
            FROM "Reviews" AS r
            WHERE r.product_id = "Products".id
          )`),
          "DESC",
        ],
      ],
      
      limit: 5,
      subQuery: false, // Ensure proper handling of the include with limit and offset
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No top-rated products found",
      });
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve top-rated products",
      error: error,
    });
  }
};

//@desc  Get best-selling products
//@route GET /api/best-selling
//@access Public


exports.getTopSellingProducts = async (req, res) => {
  try {
    const products = await OrderItem.findAll({
      attributes: [
        "product_id",
        [
          sequelize.fn("SUM", sequelize.col("OrderItem.quantity")),
          "totalSold"
        ]
      ],

      include: [
        {
          model: Products,
          as: "product",
          attributes: ["id", "name", "price", "slug"],
          required: true
        },
        {
          model: Order,
          as: "orders",
          attributes: [],
          where: {
            is_paid: true
          },
          required: true
        }
      ],

      group: [
        "OrderItem.product_id",
        "product.id"
      ],

      order: [
        [sequelize.literal('"totalSold"'), "DESC"]
      ],

      limit: 10,
      subQuery: false
    });

    return res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error retrieving best-selling products.",
      success: false,
      error: error.message
    });
  }
};
/*
exports.updateDefaultValute = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const selectedId = req.params.id;
    //get all the users shipping addresss
    //set all of them to false
    //than update address that is selected or
    //update the other fields and keep the selected to true

    const selectedAddress = await ShippingAddress.findOne({
      where: {
        user_id: req.user.id,
        id: selectedId,
      },
      transaction,
    });

    if (!selectedAddress) {
      await transaction.rollback();
      return res.status(404).json({
        message: "Shipping address not found",
        success: false,
      });
    }
    // console.log(selectedAddress);

    // 2. Set all user's addresses to false
    await ShippingAddress.update(
      { is_default: false },
      {
        where: {
          user_id: req.user.id,
        },
      },
      transaction,
    );

    // 3. Set the selected address to true
    await selectedAddress.update(
      {
        is_default: true,
      },
      { transaction },
    );
    await transaction.commit();
    return res.status(200).json({
      message: "Default shipping address updated",
      shippingAddress: selectedAddress,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating default value",
      success: false,
    });
  }
};

exports.deleteShippingAddress = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const addressId = req.params.id;
    const address = await ShippingAddress.findOne({
      where: {
        id: addressId,
        user_id: req.user.id,
      },
      transaction,
    });

    if (!address) {
      await transaction.rollback();
      return res.status(404).json({
        message: "Shipping address not found.",
        success: false,
      });
    }

    // Remember whether the address being deleted is the default
    const wasDefault = address.is_default;
    // Delete it
    await address.destroy({ transaction });

    // If the deleted address was the default,
    // choose another address as the new default
    if (wasDefault) {
      const newDefaultAddress = await ShippingAddress.findOne({
        where: {
          user_id: req.user.id,
        },
        order: [["createdAt", "ASC"]],
        transaction,
      });

      if (newDefaultAddress) {
        await newDefaultAddress.update(
          {
            is_default: true,
          },
          {
            transaction,
          },
        );
      }
    }

    await transaction.commit();

    return res.status(200).json({
      message: "Shipping address deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error removing shipping address",
      success: false,
    });
  }
};

exports.checkout = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.body;
    const selectedAddress = await ShippingAddress.findOne({
      where: {
        user_id: req.user.id,
        id: id,
      },
      transaction,
    });

    if (!selectedAddress) {
      await transaction.rollback();
      return res.status(404).json({
        message: "Shipping address not found",
        success: false,
      });
    }

    // Remove default from all user's addresses
    await selectedAddress.update(
      {
        is_default: false,
      },
      {
        where: {
          user_id: req.user.id,
        },
        transaction,
      },
    );

    // Make the selected address the default
    await selectedAddress.update(
      {
        is_default: true,
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).json({
      url: "/payment",
      success: true,
    });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return res.status(500).json({
      message: "Error updating checkout default value",
      success: false,
    });
  }
};
*/
