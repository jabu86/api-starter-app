const jwt = require("jsonwebtoken");
const {User} = require("../models");
const tokenBlacklist = require("../utils/tokenBlacklist");
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
   const token = authHeader.split(' ')[1];

    if(tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token has been Logged out' });
    }
   try {
       const decoded = jwt.verify(token, JWT_SECRET);
       const user = await User.findByPk(decoded.id,{
           attributes: ['id', 'email', 'name'],
       });
       if (!user) {
           return res.status(401).json({ message: 'User not found' });
       }
       req.user = user;
       next();
   }catch(err){
       console.error(err);
       return res.status(401).json({ message: 'Invalid token' });
   }
}

module.exports = authMiddleware;