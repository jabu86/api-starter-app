
const { User , Role , Order, Products, sequelize } = require("../../models");
exports.index = async (req, res) => {
    try {
        const year = Number(req.query.year) || new Date().getFullYear();
        const customerCount = await User.count({
            include: [
                {
                    model: Role,
                    where: { name: "customer" },
                    through: { attributes: [] },
                    attributes: [],
                    required: true,
                },
            ],
            distinct: true,
        });

        const productQytTotal = await Products.sum("quantity", {where: {in_stock: true}}) ?? 0;
        const usersCount = await User.count();
        const ordersCount = await Order.count();
        const salesCount  = await  Order.count({where: {is_paid:true}});

        // Get paid order revenue grouped by month
        const monthExpression = sequelize.fn(
            "DATE_TRUNC",
            "month",
            sequelize.col("createdAt")
        );


        const monthlyResults = await Order.findAll({
            attributes: [
                [
                    sequelize.fn(
                        "TO_CHAR",
                        monthExpression,
                        "YYYY-MM"
                    ),
                    "month",
                ],
                [
                    sequelize.fn("SUM", sequelize.col("total")),
                    "revenue",
                ],
            ],
            where: {
                is_paid: true,
                createdAt: {
                    [require("sequelize").Op.gte]: new Date(Date.UTC(year, 0, 1)),
                    [require("sequelize").Op.lt]: new Date(Date.UTC(year + 1, 0, 1)),
                },
            },
            group: [monthExpression],
            order: [[monthExpression, "ASC"]],
            raw: true,
        });

        // Include months with no sales
        const revenueByMonth = Object.fromEntries(
            monthlyResults.map((item) => [
                item.month,
                Number(item.revenue) || 0,
            ])
        );

        const monthlySales = Array.from({ length: 12 }, (_, index) => {
            const month = `${year}-${String(index + 1).padStart(2, "0")}`;

            return {
                month,
                revenue: revenueByMonth[month] || 0,
            };
        });


        return res.status(200).json({
            success: true,
            usersCount,
            ordersCount,
            salesCount,
            customerCount,
            productQytTotal,
            monthlySales,
        });
    }catch(err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Dashboard data could not be loaded.",
        });
    }
}