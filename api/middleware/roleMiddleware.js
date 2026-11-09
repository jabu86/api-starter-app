
const {User, Role} = require('../models');
const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
      try {

        //   const user = await User.findByPk(req.user.id, {
        //       include: Role
        //   });
        //  console.log("ROLE MIDDLEWARE:", req.user);

            if (!req.user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
        //   const userRoles = user.Roles?.map(role => role.name) || [];


          const hasRole = allowedRoles.some(role =>
            //   userRoles.includes(role)
             req.user.roles.includes(role)
          );
          

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