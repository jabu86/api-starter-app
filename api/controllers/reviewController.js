const { Reviews } = require("../models");

//@desc  Create new review
//@route POST /api/reviews
//@access Private
exports.createReview = async (req, res) => {
  try {
    const { ratings, review, product_id } = req.body;

    // check if user has already add a review;
    const existingReviews = await Reviews.findOne({
      where: {
        product_id,
        user_id: req.user.id,
      },
    });
    if (existingReviews) {
      return res.status(404).json({
        message: `${req.user.name}, you already reviewed this product.  Please review another product.`,
      });
    }

    const addReview = await Reviews.create({
      user_id: req.user.id,
      product_id,
      ratings,
      review,
    });

    return res.status(201).json({
      message: "Review added successfully.",
      addReview,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "create review",
      success: false,
    });
  }
};

//@desc  Get product review new review
//@route GET /api/reviews/:id
//@access Public
exports.getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Reviews.findAll({
      where: { product_id: id },
      include: [
        {
          association: "user",
          include: [
            {
              association: "profile",
            },
          ],
        },
      ],
    });
    if (!reviews) {
      return res
        .status(404)
        .json({ message: "Reviews not found", success: false });
    }

    return res.status(201).json({
      message: "getting reviews",
      reviews,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "error getting reviews",
      success: false,
    });
  }
};

//@desc  Get product review new review
//@route GET /api/reviews/:id
//@access Private
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { ratings, review } = req.body;
    const reviews = await Reviews.findOne({
      where: { id },
    });
    
    if (reviews.user_id !== req.user.id) {
      return res
        .status(404)
        .json({
          message: "You can only update your reviews.\n Not Authorized",
          success: false,
        });
    }

    if (!reviews) {
      return res
        .status(404)
        .json({ message: "Reviews not found", success: false });
    }
    ((reviews.ratings = ratings), (reviews.review = review));
    await reviews.save();
    return res.status(201).json({
      message: "Review updated successfull.",
      reviews,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "error getting reviews",
      success: false,
    });
  }
};
//@desc  Deletes user review
//@route Delete /api/reviews/:id
//@access Private
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;   
    const reviews = await Reviews.findOne({
      where: { id },
    }); 
    
     if (reviews.user_id !== req.user.id) {
      return res
        .status(404)
        .json({
          message: "You can only delete your reviews.\n Not Authorized",
          success: false,
        });
    }

    if (!reviews) {
      return res
        .status(404)
        .json({ message: "Reviews not found", success: false });
    }
    await reviews.destroy();
    return res.status(201).json({
      message: "Review deleted successfull.",
      reviews,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "error deleting reviews",
      success: false,
    });
  }
};
