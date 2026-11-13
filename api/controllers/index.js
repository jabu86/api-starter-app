const { Op, literal, fn, col } = require("sequelize");

const {
  Category,
  Brand,
  product_images,
  Products,
  Sizes,
  Colors,
  Reviews,
  OrderItem,
  Order,
  sub_category_product,
  SubCategory,
  Contact,
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

exports.contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contacts = await Contact.create({
      name,
      email,
      message,
    });
    if (!contacts) {
      return res
        .status(404)
        .json({ message: "Error createing contacts", success: false });
    }
    return res
      .status(201)
      .json({ message: "Message sent successfully.", success: true });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Error creating sending message: ",
      err,
    });
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
//@route GET /api/shop
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

    if (sort === "latest") {
      order = [["createdAt", "DESC"]];
    }

    if (sort === "oldest") {
      order = [["createdAt", "ASC"]];
    }
    let rankedProductIds = null;

    if (sort === "rating") {
      const ratings = await Reviews.findAll({
        attributes: [
          "product_id",
          [
            sequelize.fn(
              "AVG",
              sequelize.cast(sequelize.col("ratings"), "NUMERIC"),
            ),
            "averageRating",
          ],
          [sequelize.fn("COUNT", sequelize.col("id")), "totalReviews"],
        ],
        group: ["product_id"],

        order: [
          [sequelize.literal('"averageRating"'), "DESC"],
          [sequelize.literal('"totalReviews"'), "DESC"],
        ],
      });

      rankedProductIds = ratings.map((item) => item.product_id);
      // return console.log(rankedProductIds, 'top rated')
    }

    if (sort === "best-selling") {
      const sales = await bestSelling();
      rankedProductIds = sales.map((item) => item.product_id);
      // return console.log(rankedProductIds, 'top best selling')
    }

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
    let rankedOrder = order;

    if (rankedProductIds !== null) {
      // Apply ranking without removing your other filters
      productWhere[Op.and] = [
        ...(productWhere[Op.and] || []),
        {
          id: {
            [Op.in]: rankedProductIds,
          },
        },
      ];

      if (rankedProductIds.length > 0) {
        const caseConditions = rankedProductIds
          .map((id, index) => `WHEN ${Number(id)} THEN ${index}`)
          .join(" ");

        rankedOrder = [
          [
            sequelize.literal(`CASE "Products"."id" ${caseConditions} END`),
            "ASC",
          ],
        ];
      }
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
      order: rankedOrder,
      distinct: true,
      subQuery: false, // Ensure proper handling of the include with limit and offset
    });

    // 2. Extract IDs
    const ids = productIds.map((product) => product.id);

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
    //get average ratings for all the products
    const productsWithRatings = await averageRating(rows, ids);

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
//@route GET /api/shop/slug
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
      ],
      order: [["createdAt", "DESC"]],
      limit: 4,
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No latest products found",
      });
    }
    const ids = products.map((product) => product.id);

    //get average ratings for all the products
    const productsWithRatings = await averageRating(products, ids);

    return res.status(200).json({
      success: true,
      products: productsWithRatings,
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
      where: {
        active: true,
      },
      attributes: {
        include: [
          [
            fn("AVG", literal('CAST("reviews"."ratings" AS NUMERIC)')),
            "averageRating",
          ],
          [fn("COUNT", col("reviews.id")), "totalReviews"],
        ],
      },
      include: [
        {
          model: Reviews,
          as: "reviews",
          attributes: [],
          required: true,
        },
        {
          model: product_images,
          as: "images",
          attributes: ["id", "image", "active"],
          where: { active: true },
          required: false,
        },
      ],
      group: ["Products.id", "images.id"],
      having: literal('COUNT(DISTINCT "reviews"."id") >= 3'),
      order: [
        [literal('"averageRating"'), "DESC"],
        [literal('"totalReviews"'), "DESC"],
      ],

      limit: 4,
      subQuery: false,
    });

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to retrieve top-rated products",
      error: error.message,
    });
  }
};

//@desc  Get best-selling products
//@route GET /api/best-selling
//@access Public
exports.getTopSellingProducts = async (req, res) => {
  try {
    // 1. Get products with more than 3 units sold

    const topSelling = await bestSelling();

    // No qualifying products
    if (topSelling.length === 0) {
      return res.status(200).json({
        success: true,
        products: [],
      });
    }

    const productIds = topSelling.map((item) => item.product_id);

    // 2. Get products and their active images
    const products = await Products.findAll({
      where: {
        id: productIds,
      },

      include: [
        {
          model: product_images,
          as: "images",
          where: {
            active: true,
          },
          required: false,
        },
      ],
    });

    // 3. Calculate average rating and review count
    const productsWithRatings = await averageRating(products, productIds);

    const result = topSelling
      .map((soldItem) => {
        const product = productsWithRatings.find(
          (item) => Number(item.id) === Number(soldItem.product_id),
        );

        return product || null;
      })
      .filter(Boolean);
    return res.status(200).json({
      success: true,
      products: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error retrieving best-selling products.",
      success: false,
      error: error.message,
    });
  }
};

//@desc get Products by there categories
//@route GET /api/products-categories
//@access Public

// @desc Get products grouped by their categories
// @route GET /api/products-categories
// @access Public
exports.getProductCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "slug"],
      order: [["name", "DESC"]],
      limit: 5,
      include: [
        {
          model: SubCategory,
          as: "subCategory",
          attributes: ["id", "name", "slug"],
          include: [
            {
              model: sub_category_product,
              as: "productAssignments",
              attributes: ["id", "product_id"],
              include: [
                {
                  model: Products,
                  as: "product",
                  where: {
                    active: true,
                  },
                  required: false,
                  include: [
                    {
                      model: product_images,
                      as: "images",
                      where: {
                        active: true,
                      },
                      required: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Collect products for each category and remove duplicates
    const categoryProducts = categories.map((category) => {
      const productsMap = new Map();

      category.subCategory.forEach((subCategory) => {
        subCategory.productAssignments.forEach((assignment) => {
          const product = assignment.product;

          if (product && !productsMap.has(Number(product.id))) {
            productsMap.set(Number(product.id), product);
          }
        });
      });

      return {
        category,
        products: Array.from(productsMap.values()).slice(0, 4),
      };
    });

    const categoriesWithProducts = categoryProducts.filter(
      (item) => item.products.length > 0,
    );

    const allProductsMap = new Map();

    categoriesWithProducts.forEach(({ products }) => {
      products.forEach((product) => {
        if (!allProductsMap.has(Number(product.id))) {
          allProductsMap.set(Number(product.id), product);
        }
      });
    });

    const allProducts = Array.from(allProductsMap.values());

    const productIds = allProducts.map((product) => product.id);

    const ratedProducts = await averageRating(allProducts, productIds);

    const ratedProductsMap = new Map(
      ratedProducts.map((product) => [Number(product.id), product]),
    );

    const formattedCategories = categoriesWithProducts.map(
      ({ category, products }) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        products: products.map((product) =>
          ratedProductsMap.get(Number(product.id)),
        ),
      }),
    );

    return res.status(200).json({
      success: true,
      products: formattedCategories,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve product categories",
    });
  }
};

/*
 *@desc  Calculate average rating for a product
 *returns an object with averageRating and totalReviews
 *@access Private
 */
const averageRating = async (products, ids) => {
  try {
    const ratings = await Reviews.findAll({
      attributes: [
        "product_id",
        [
          sequelize.fn(
            "AVG",
            sequelize.cast(sequelize.col("ratings"), "NUMERIC"),
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
      ratingMap[Number(rating.product_id)] = {
        averageRating: Number(rating.averageRating),
        totalReviews: Number(rating.totalReviews),
      };
    });

    return products.map((product) => {
      const rating = ratingMap[Number(product.id)];

      return {
        ...product.toJSON(),
        averageRating: rating?.averageRating ?? 0,
        totalReviews: rating?.totalReviews ?? 0,
      };
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error calculating average ratings.");
  }
};

const bestSelling = async () => {
  const topSelling = await OrderItem.findAll({
    attributes: [
      "product_id",
      [sequelize.fn("SUM", sequelize.col("OrderItem.quantity")), "totalSold"],
    ],

    include: [
      {
        model: Products,
        as: "product",
        attributes: [],
        where: {
          active: true,
        },
        required: true,
      },
      {
        model: Order,
        as: "orders",
        attributes: [],
        where: {
          is_paid: true,
        },
        required: true,
      },
    ],

    group: ["OrderItem.product_id"],
    having: sequelize.literal('SUM("OrderItem"."quantity") > 3'),
    order: [[sequelize.literal('"totalSold"'), "DESC"]],
    limit: 4,
    subQuery: false,
  });
  return topSelling;
};
