const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {now} = require("sequelize/lib/utils");

const folders = {
    brands:"public/images/brands",
    products:"public/images/products",
    profile:"public/images/profile",
}
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
       const type = req.uploadType;
       const uploadPath = folders[type];
       if(!uploadPath){
          return  cb(new Error("Invalid upload type"));
       }

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);

    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName =Date.now() + "-"+Math.random(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    }
});
// // File filter (only images)
const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);

    if (ext && mime) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage: storage,
    // fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    }
});

module.exports = upload;