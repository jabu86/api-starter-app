
const { User , Role , Order, Products} = require("../../models");
exports.index = async (req, res) => {
    try {
        const customerCount = await User.findAll({
            include: [
                {
                    model: Role,
                    where: { name: "customer" },
                    through: { attributes: [] },
                    attributes: [],
                    required: true,
                },
            ],
        });

        const productQytTotal = await Products.sum("quantity", {where: {in_stock: true}}) ?? 0;

        const usersCount = await User.count();
        const ordersCount = await Order.count();
        const salesCount  = await  Order.findAll({where: {is_paid:true}});



        return res.status(200).json({ usersCount , ordersCount ,salesCount : salesCount.length , customerCount : customerCount.length , productQytTotal : productQytTotal , success:true });
    }catch(err) {
        console.error(err)
    }
}