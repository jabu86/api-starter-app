exports.index = async (req, res) => {
    try {

        res.status(200).json({ message:"Dashboard"});
    }catch(err) {
        console.error(err)
    }
}