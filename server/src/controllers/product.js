import Product from "../models/product.js";
import Category from "../models/category.js";
import ErrorHandler from "../utils/utility-class.js";
import { cacheData } from "../app.js";
import { invalidateCache } from "../utils/features.js";

export const getLatestProducts = async (req, res, next) => {
  let products;
  let key = "latest-products";

  if (cacheData.has(key)) products = JSON.parse(cacheData.get(key));
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    cacheData.set(key, JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
};

export const getProduct = async (req, res, next) => {
  let product;
  const key = `product-${req.params.id}`;

  if (cacheData.has(key)) product = JSON.parse(cacheData.get(key));
  else {
    product = await Product.findById(req.params.id).populate("category");
    cacheData.set(key, JSON.stringify(product));
  }

  if (!product) return next(new ErrorHandler("Product not found", 404));

  return res.status(200).send(product);
};

export const getAllProducts = async (req, res, next) => {
  const { search, brand, sort, category, price, parentCategory } = req.query;

  const page = Number(req.query.page) || 1;

  // const key = `products-${search}-${sort}-${sellingPrice}-${page}`;

  let products;
  let totalPage;

  // if (cacheData.has(key)) {
  //   const data = JSON.parse(cacheData.get(key));
  //   totalPage = data.totalPage;
  //   products = data.products;
  // } else {
  const limit = 15;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  if (search) {
    baseQuery.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (price) {
    baseQuery.sellingPrice = {
      $lte: Number(price),
    };
  }

  if (category || parentCategory) {
    if (category || (category && parentCategory)) {
      const categoryId = category.split(",").map((id) => id);
      baseQuery.category = {
        $in: categoryId,
      };
    } else if (parentCategory) {
      const categories = await Category.find({ parentCategory }).select("_id");
      const categoriesId = categories.map((c) => c._id);
      baseQuery.category = { $in: categoriesId };
    }
  }

  if (brand) {
    const brandNames = brand.split(",").map((name) => new RegExp(name, "i"));
    baseQuery.brand = {
      $in: brandNames,
    };
  }

  const productsPromise = Product.find(baseQuery)
    .populate({
      path: "category",
      populate: {
        path: "parentCategory",
        model: "Category",
      },
    })
    .sort(sort && { sellingPrice: sort === "asc" ? 1 : -1 })
    .limit(limit)
    .skip(skip);

  const [productsFetched, filteredOnlyProduct] = await Promise.all([
    productsPromise,
    Product.find(baseQuery),
  ]);

  products = productsFetched;
  totalPage = Math.ceil(filteredOnlyProduct.length / limit);
  const totalProductsNo = filteredOnlyProduct.length;
  // cacheData.set(key, JSON.stringify({ products, totalPage }));
  // }

  return res.status(200).json({
    success: true,
    products,
    totalPage,
    totalProductsNo,
  });
};

export const getBrands = async (req, res, next) => {
  const brands = await Product.aggregate([
    {
      $group: {
        _id: "$brand",
      },
    },
    {
      $project: {
        _id: 0,
        brand: "$_id",
      },
    },
    {
      $sort: {
        brand: 1, // 1 for ascending order
      },
    },
  ]);

  const brandNames = brands.map((brand) => brand.brand);

  res.status(200).json({ success: true, brandNames });
};

export const newProduct = async (req, res, next) => {
  let {
    title,
    description,
    oldPrice,
    sellingPrice,
    categoryId,
    brand,
    ratings,
    stock,
    images,
    sizes,
    color,
  } = req.body;
  
  const cat = await Category.findById(categoryId);
  if (!cat) return next(new ErrorHandler("No category Found", 404));

  if (
    !title ||
    !description ||
    !oldPrice ||
    !sellingPrice ||
    !brand ||
    !stock ||
    !images ||
    !sizes ||
    !color
  )
    return next(new ErrorHandler("Add all fields", 400));

  const newProduct = await Product.create({
    title,
    description,
    oldPrice,
    sellingPrice,
    category: categoryId,
    brand,
    stock,
    images,
    sizes,
    color,
    ratings,
  });

  await invalidateCache({ product: true });

  return res.status(201).send(newProduct);
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    sellingPrice,
    stock,
    category,
    description,
    brand,
    images,
    sizes,
    color,
  } = req.body;

  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  if (title) product.title = title;
  if (sellingPrice) product.sellingPrice = sellingPrice;
  if (stock) product.stock = stock;
  if (brand) product.brand = brand;
  if (images) product.images = images;
  if (sizes) product.sizes = sizes;
  if (color) product.color = color;
  if (category) product.category = category;
  if (description) product.description = description;

  await product.save();

  await invalidateCache({
    product: true,
    admin: true,
  });

  res.status(200).json({ success: true, product });
};

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product doesn't exist", 404));

  await product.deleteOne();

  await invalidateCache({
    product: true,
    admin: true,
    productId: product._id,
  });

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};
