const { Op, where, or } = require("sequelize");

const { Order, ShippingAddress, OrderItem, Products } = require("../models");
const sequelize = require("../config/database");

//@desc  Create new order
//@route POST /api/user/orders
//@access Private
exports.createOrders = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { orderItems, paymentMethod } = req.body;

    // Check order items
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      await transaction.rollback();

      return res.status(400).json({
        message: "No order items in the cart",
        success: false,
      });
    }

    // Get user's default shipping address
    const selectedAddress = await ShippingAddress.findOne({
      where: {
        user_id: req.user.id,
        is_default: true,
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

    // --------------------------------
    // Calculate order totals
    // --------------------------------

    let itemPrice = 0;

    for (const item of orderItems) {
      const product = await Products.findByPk(item.id, {
        transaction,
      });

      if (!product) {
        throw new Error(`Product ${item.id} not found`);
      }

      // Check quantity
      if (!item.quantity || item.quantity < 1) {
        throw new Error(`Invalid quantity for product ${product.id}`);
      }

      // Check stock
      if (product.quantity < item.quantity) {
        throw new Error(`${product.name} does not have enough stock`);
      }

      itemPrice += Number(product.price) * Number(item.quantity);
    }

    const taxPrice = 0; // Change this when you implement tax
    const shippingPrice = 0; // Change this when you implement shipping

    const totalPrice = itemPrice + taxPrice + shippingPrice;

    // --------------------------------
    // Copy shipping address
    // --------------------------------

    const copyOrder = {
      user_id: req.user.id,
      shipping_first_name: selectedAddress.first_name,
      shipping_last_name: selectedAddress.last_name,
      shipping_address: selectedAddress.address,
      shipping_address_2: selectedAddress.address_2,
      shipping_city: selectedAddress.city,
      shipping_province: selectedAddress.province,
      shipping_postal_code: selectedAddress.postal_code,
      shipping_country: selectedAddress.country,
      payment_method: paymentMethod,
      item_price: itemPrice,
      tax_price: taxPrice,
      shipping_price: shippingPrice,
      total: totalPrice,
      status: "pending",
      is_paid: false,
      is_delivered: false,
    };

    // --------------------------------
    // Create order
    // --------------------------------

    const order = await Order.create(copyOrder, { transaction });

    // --------------------------------
    // Create order items
    // --------------------------------

    for (const item of orderItems) {
      const product = await Products.findByPk(item.id, { transaction });

      await OrderItem.create(
        {
          order_id: order.id,
          product_id: product.id,
          quantity: item.quantity,

          // Get price from database
          price: product.price,
        },
        { transaction },
      );

      // Reduce stock
      await product.decrement("quantity", {
        by: item.quantity,
        transaction,
      });
    }

    // --------------------------------
    // Commit transaction
    // --------------------------------

    await transaction.commit();

    return res.status(201).json({
      message: "Order created successfully",
      order,
      success: true,
    });
  } catch (err) {
    await transaction.rollback();

    // console.error("Create order error:", err);

    return res.status(500).json({
      message: err.message || "Unable to create order",
      success: false,
    });
  }
};

//@desc  Get login new user orders
//@route Get /api/user/orders
//@access Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        user_id: req.user.id,
      },
    });

    if (!orders) {
      return res
        .status(404)
        .json({ message: "User orders not found", success: false });
    }

    return res.status(200).json({ orders, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Error getting user orders",
      success: false,
    });
  }
};

//@desc  Get orders by id
//@route Get /api/user/orders/:id
//@access Private
exports.getByIdOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        "user",
        {
          association: "item",
          include: [
            {
              association: "product",
              include: [
                "category",
                "brand",
                "images",
                // "productSizes",
                // "productColors",
              ],
            },
          ],
        },
      ],
    });
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        order,
        success: false,
      });
    }

    return res.status(201).json({
      order,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Unable to get order",
      success: false,
    });
  }
};

//@desc  Update Order to pay
//@route POST /api/user/orders/:id/pay
//@access Private
exports.payOrderItem = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    //check if this order is user order
    if (order.user_id !== req.user.id) {
      return res
        .status(404)
        .json({ message: "This is not your order", success: false });
    }

    order.is_paid = true;
    order.paid_at = new Date();
    await order.save();

    return res
      .status(200)
      .json({ message: "Order paid successfully", success: true, order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Error occur while paying for order",
      success: false,
    });
  }
};

//@desc  Update Order to deliver
//@route POST /api/admin/orders/:id/delivered
//@access Private/Admin
exports.deliverOrderItem = async (req, res) => {
  try {
    res.status(200).json({ message: "Deliver update" });
  } catch (err) {
    console.error(err);
  }
};

//@desc  admin get all orders
//@route GET /api/admin/orders
//@access Private/Admin
exports.getAllOders = async (req, res) => {
  try {
    res.status(200).json({ message: "admin orders" });
  } catch (err) {
    console.error(err);
  }
};
