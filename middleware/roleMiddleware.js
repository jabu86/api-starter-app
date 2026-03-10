
const {User, Role} = require('../models');
const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
      try {
          console.log(req.user);

          const user = await User.findByPk(req.user.id, {
              include: Role
          });
          const userRoles = user.Roles?.map(role => role.name) || [];

          console.log(userRoles)
          const hasRole = allowedRoles.some(role =>
              userRoles.includes(role)
          );
          console.log(hasRole);

          if (!hasRole) {
              return res.status(403).json({
                  message: "Access denied"
              });
          }

          next();
      }catch(err) {
          res.status(500).send({message:err.message});
      }
  }
}

module.exports = roleMiddleware;