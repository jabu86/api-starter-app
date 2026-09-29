const { Op, where } = require("sequelize");

const {
  Category,
  Brand,
  product_images,
  Products,
  Sizes,
  Colors,
  ShippingAddress,
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

// Get active product

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

exports.shipping = async (req, res) => {
  try {
    //check if user has an address or addresses
    //return the address that user has created or already created

    //Get user address
    const shippingAddress = await ShippingAddress.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [
        // ["is_default", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    // console.log(shippingAddress.length);

    if (shippingAddress.length === 0) {
      return res.status(200).json({
        hasAddress: false,
        shippingAddress,
        message:
          "You don't have a shipping address. Please add an address before continuing.",
        success: true,
      });
    }
    return res.status(200).json({
      hasAddress: true,
      shippingAddress,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addShippingAddress = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      address,
      address_2,
      city,
      country,
      province,
      postal_code,
    } = req.body;
    //check how many address does a user have
    //if is the first address set default value to true
    //if a user has more than one address set the default value to false
    //if more than 3 length not allowed to add more

    const checkUserShippingAddress = await ShippingAddress.count({
      where: {
        user_id: req.user.id,
      },
    });

    if (checkUserShippingAddress >= 3) {
      return res.status(404).json({
        message:
          "You can only have a maximum of 3 shipping addresses. Please choose from the addresses or you can edit and update address.",
        success: true,
      });
    }

    const is_default = checkUserShippingAddress === 0;
    const shippingAddress = await ShippingAddress.create({
      user_id: req.user.id,
      first_name,
      last_name,
      address,
      address_2,
      city,
      country,
      province,
      postal_code,
      is_default,
    });
    return res.status(200).json({
      hasAddress: true,
      message: "Shipping address created successfully.",
      shippingAddress,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to add shipping address",
      success: false,
    });
  }
};

exports.editShippingAddress = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      address,
      address_2,
      city,
      country,
      province,
      postal_code,
    } = req.body;
    const id = req.params.id;
    const shippingAddress = await ShippingAddress.findByPk(id);
    shippingAddress.first_name = first_name;
    shippingAddress.last_name = last_name;
    shippingAddress.address = address;
    shippingAddress.address_2 = address_2;
    shippingAddress.city = city;
    shippingAddress.country = country;
    shippingAddress.province = province;
    shippingAddress.postal_code = postal_code;
    await shippingAddress.save();
    return res.status(200).json({
      message: "Shipping address updated successfully.",
      shippingAddress,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to add shipping address",
      success: false,
    });
  }
};

exports.updateDefaultValute = async (req, res) => {
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
    });

    if (!selectedAddress) {
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
    );

    // 3. Set the selected address to true
    await selectedAddress.update({
      is_default: true,
    });

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
