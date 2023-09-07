const Product = require("../model/product")


exports.addProduct = async (req, res) => {
    const { productName, category, brand, price, quantity, customerId, organizationId } = req.body
    
    try {
        const productDetail = new Product({ productName: productName, category: category, brand: brand, price: price, quantity: quantity, customerId: customerId, organizationId: organizationId })
        if (productDetail) {
            await productDetail.save()
            return res.status(200).json({ success: true, msg: "Product Added Successfully", productDetail })
        }
        else {
            return res.status(404).json({ success: true, msg: "Some error" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }

}

exports.getProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const productDetail = await Product.find().skip(skip).limit(limit);
        const totalCount = await Product.countDocuments();
        
        if (!productDetail) {
            return res.status(404).json({ success: false, msg: "Product Not found" })
        }
        else {
            return res.status(200).json({ success: true, msg: "Product Get Successfully", productDetail: productDetail, totalCount:totalCount })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Server Error" })
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.query
        const productDetail = await Product.findByIdAndRemove(_id)
        return res.status(200).json({ success: true, msg: "Delete Successfully" })

    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { _id, category, brand, price, quantity } = req.body
        const productDetail = await Product.findByIdAndUpdate({ _id: _id }, { category: category }, { brand: brand }, { price: price }, { quantity: quantity })
        if (productDetail) {
            return res.status(200).json({ success: true, msg: "Update Successfully" })
        }
        else {
            return res.status(404).json({ success: false, msg: "Product Not Update" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error })
    }

}

exports.searchProduct = async (req, res) => {

}