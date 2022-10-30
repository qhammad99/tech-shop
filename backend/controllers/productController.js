exports.getAllProducts = (req, res) => {
    return res.status(200).json({
        success: true, 
        message: "All Products"
    });
}