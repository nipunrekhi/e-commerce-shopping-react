import asyncHandler from "express-async-handler";
import Products from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Variant from "../models/variantModel.js";
import ProductAttribute from "../models/attributeModel.js";

//Admin Can Add Products
const addProducts = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, categoryId, subCategoryId } = req.body;
    const imagePath = req.file.path.replace(/\\/g, "/");
    // Create a new product object
    const product = new Products({
      name,
      description,
      price,
      image: imagePath,
      categoryId: categoryId || null, // Assign the category ID to the product
      subCategoryId: subCategoryId || null, // Assign the subcategory ID to the product, or set it to null if not provided
    });
    // Save the product to the database
    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const data = await Products.find({ categoryId: categoryId });
    if (data.length > 0) {
      return res.status(200).json({ success: true, data });
    } else {
      return res
        .status(200)
        .json([]);
    }
  } catch (error) {
    console.error("Error in fetching products:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

//Show product
const showProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Products.findById(productId);
    if (productId) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    console.error("Error retrieving product", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Admin Can Add Category
const addCategory = asyncHandler(async (req, res) => {
  const { name, description, parentId } = req.body;
  try {
    const imagePath = req.file.path.replace(/\\/g, "/");
    // Create a new subcategory instance
    if (parentId == null) {
      const category = new Category({
        name,
        description,
        parentId: null,
        image: imagePath,
      });
      const createdCategory = await category.save();
      res.status(201).json(createdCategory);
    } else {
      const category = new Category({
        name,
        description,
        parentId: parentId,
        image: imagePath,
      });
      const createdCategory = await category.save();
      res.status(201).json(createdCategory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Show Categories
const productsDropdown = asyncHandler(async (req, res) => {
  try {
    // Retrieve the category tree from the database
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    console.error("Error retrieving category tree:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//Show Categories
const getCategory = asyncHandler(async (req, res) => {
  try {
    // Retrieve the category tree from the database
    const categoryTree = await Category.find({ parentId: null });
    res.json(categoryTree);
  } catch (error) {
    console.error("Error retrieving category tree:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//Show Category Tree
const getCategoryTree = asyncHandler(async (req, res) => {
  try {
    const categoryTree = await buildCategoryTree();
    res.status(200).send(categoryTree);
  } catch (error) {
    console.error("Error retrieving category tree:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Function to build the category tree
async function buildCategoryTree() {
  const categories = await Category.find();
  const categoryMap = {};
  // Create a mapping of categories based on their parent IDs
  categories.forEach((category) => {
    categoryMap[category._id] = {
      _id: category._id,
      name: category.name,
      description: category.description,
      image: category.image,
      children: [],
    };
  });
  // Build the category tree by assigning children to their respective parents
  const categoryTree = [];
  categories.forEach((category) => {
    if (category.parentId) {
      const parent = categoryMap[category.parentId];
      if (parent) {
        parent.children.push(categoryMap[category._id]);
      }
    } else {
      categoryTree.push(categoryMap[category._id]);
    }
  });
  return categoryTree;
}
//Admin can add Variants of products
const addVariant = asyncHandler(async (req, res) => {
  const { name, description, color, price, productId } = req.body;
  try {
    const imagePath = req.file.path.replace(/\\/g, "/");
    // Create a new subcategory instance
    const variant = new Variant({
      name,
      description,
      color,
      price,
      productId: productId,
      image: imagePath,
    });
    const createdVariant = await variant.save();
    res.status(201).json(createdVariant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const getVariants = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.productId;
    const variants = await Variant.find({ productId: productId });
    res.status(200).json(variants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//Admin can add attributes of Product
const addAttributes = asyncHandler(async (req, res) => {
  try {
    const { productId, attributes } = req.body;
    // Create a new instance of the ProductAttribute model with the extracted data
    const attributeObjects = attributes?.map((attribute) => ({
      productId,
      size: attribute,
    }));

    // Save the attributes to the database
    const savedAttributes = await ProductAttribute.insertMany(attributeObjects);
    res.status(200).json(savedAttributes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const showAttribute = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.productId;
    const productAttribute = await ProductAttribute.find({
      productId: productId,
    });
    res.status(200).json(productAttribute);
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

export {
  addProducts,
  getProducts,
  addCategory,
  getCategory,
  getCategoryTree,
  showProduct,
  productsDropdown,
  addVariant,
  getVariants,
  addAttributes,
  showAttribute,
};
