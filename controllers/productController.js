const db = require('../helpers/mongoConnect')
const Product = require('../models/productsModel')
const Category = require('../models/categoryModel')
const { v4: uuidv4 } = require('uuid');



const addItem = async (req, res) => {
    try {
        const { productName, categoryName, price, productImage, brand } = req.body
        const categoryData = await Category.find({ categoryName: categoryName })
        if (categoryData.length > 0) {
            const categoryId = categoryData[0]._id
            const productData = new Product({
                productName,
                categoryId,
                price,
                productImage,
                brand
            })
            const addProduct = await productData.save()
            if (addProduct) {
                res.status(200).json('Item Created')
            } else {
                res.status(500).json('Server error')
            }
        }
        else {
            const addCategory = new Category({
                categoryName: categoryName
            })
            const catData = await addCategory.save()
            if (addCategory) {
                const categoryId = catData._id
                const productData = new Product({
                    productName,
                    categoryId,
                    price,
                    productImage,
                    brand
                })
                const addProduct = await productData.save()
                if (addProduct) {
                    res.status(200).json('Item Created')
                } else {
                    res.status(500).json('Server error')
                }
            } else {
                console.error('Error inserting category:', err);
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('error')
    }
}
const getHome = ((req, res) => {
    try {
        res.render('index')
    } catch {

    }
})
const getCategories = (async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json({ 'items': categories, 'totalCategories': categories.length });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json('Server error')
    }
})
const getProduct = async (req, res) => {
    try {
        const categoryId = req.query.categoryId
        const category = await Category.find({ _id: categoryId })
        const products = await Product.find({ categoryId })
        const categoryName = category[0].categoryName
        if (products) {
            return res.status(200).json({ 'items': products, 'categoryName': categoryName })
        } else {
            return res.status(500).json('Server error')
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('error')
    }
}
const category = async (req, res) => {
    try {
        res.render('categories')
    } catch (err) {
        res.status(404).json('Not found')
    }
}
const products = async (req, res) => {
    try {
        const categoryId = req.query.categoryId
        res.render('products', { 'id': categoryId })
    } catch (err) {
        res.status(404).json('Not found')
    }
}

module.exports = {
    addItem,
    getHome,
    getProduct,
    getCategories,
    category,
    products

}