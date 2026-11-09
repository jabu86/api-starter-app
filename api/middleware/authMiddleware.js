const jwt = require("jsonwebtoken");
const {User, Role} = require("../models");
const tokenBlacklist = require("../utils/tokenBlacklist");
const JWT_SECRET = process.env.JWT_SECRET;
/*
const authMiddleware = async (req, res, next) => {

    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    
    if(tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token has been Logged out' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(decoded.id,{
            attributes: ['id', 'email', 'name'],
            include: [
                {
                    model: Role,
                    attributes: ['id', 'name'],
                    through: {attributes: []},
                }
            ]
        });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = {
            ...user.toJSON(),
            roles:user.Roles.map((role) => role.name),
        };
        console.log("AUTH:", req.user);
        next();
    }catch(err){
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
}
*/

const authMiddleware = async (req, res, next) => {

    // console.log("========== AUTH MIDDLEWARE ==========");

    const authHeader = req.headers.authorization;

    // console.log("Authorization header:", authHeader);

    if (!authHeader) {
        console.log("❌ No Authorization header");
        return res.status(401).json({
            message: 'Unauthorized - No Authorization header'
        });
    }

    if (!authHeader.startsWith('Bearer ')) {
        console.log("❌ Authorization header does not start with Bearer");
        return res.status(401).json({
            message: 'Unauthorized - Invalid Authorization format'
        });
    }

    const token = authHeader.split(' ')[1];

    // console.log("Token exists:", !!token);

    if (tokenBlacklist.includes(token)) {
        console.log("❌ Token is blacklisted");
        return res.status(401).json({
            message: 'Token has been Logged out'
        });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        // console.log("Decoded JWT:", decoded);

        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'email', 'name'],
            include: [
                {
                    model: Role,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });

        if (!user) {
            console.log("❌ No user found for JWT id:", decoded.id);

            return res.status(401).json({
                message: 'Unauthorized - User not found'
            });
        }

        req.user = {
            ...user.toJSON(),
            roles: user.Roles.map(role => role.name)
        };


        next();

    } catch (err) {

        console.error("❌ JWT/AUTH ERROR:", err);

        return res.status(401).json({
            message: 'Invalid token',
            error: err.message
        });
    }
};
module.exports = authMiddleware;