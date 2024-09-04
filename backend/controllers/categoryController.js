import Category from "../models/categoryModel.js";

export const index = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.json(categories);
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const showCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) return res.status(404).send("Category not found");

        res.json(category);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Get a specific product from specific category by categoryId and productId
export const showProduct = async (req, res) => {
    const { categoryId, productId } = req.params;

    try {
        const category = await Category.findById(categoryId);

        if (!category) return res.status(404).send("Category not found");

        const product = category.products.id(productId);

        if (!product) return res.status(404).send("Product not found");

        res.json(product);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export const store = async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const destroy = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).send("Category not found");
        res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        res.status(400).send(error.message);
    }
}