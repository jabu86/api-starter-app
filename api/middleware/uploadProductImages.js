const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs-extra");
const { v4: uuid } = require("uuid");

// store files in memory for processing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter,
});

const processProductImages = async (req, res, next) => {


    if (!req.files || req.files.length === 0) return next();

    try {
        const productId = uuid();
        const uploadPath = `public/images/products/${productId}`;
        await fs.ensureDir(uploadPath);

        const images = [];

        await Promise.all(
            req.files.map(async (file, index) => {
                const filename = `product-${Date.now()}-${index}.webp`;
                const filepath = path.join(uploadPath, filename);

                // resize + convert + compress
                await sharp(file.buffer)
                    .resize(1200, 1200, { fit: "inside" })
                    .webp({ quality: 80 })
                    .toFile(filepath);

                // create thumbnail
                const thumbName = `thumb-${filename}`;
                const thumbPath = path.join(uploadPath, thumbName);
                await sharp(file.buffer)
                    .resize(300, 300)
                    .webp({ quality: 70 })
                    .toFile(thumbPath);

                images.push({
                    image: `/images/products/${productId}/${filename}`,
                    thumbnail: `/images/products/${productId}/${thumbName}`,
                });
            })
        );

        req.processedImages = images;
        req.productImageFolder = productId;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadProductImages: upload.array("images", 5),
    processProductImages,
};