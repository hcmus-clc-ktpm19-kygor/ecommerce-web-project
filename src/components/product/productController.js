const productService = require("./productService");
const commentService = require("../comment/commentService");

/**
 * Lay 1 san pham len bang id
 *
 * @param req request
 * @param res respone
 * @returns {Promise<void>}
 */
exports.getProductById = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // trang thu n
    const product = await productService.get(req.params.id);
    const comments = await commentService.getComment(page, req.params.id);
    const relatedProduct = await productService.getRelatedProducts(
      product._id,
      product.producer,
      4
    );

    // res.json(product);
    res.render("product/views/detail", { product, comments, relatedProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.paging = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // trang thu n
    const products = await productService.paging(page);

    const results = {};
    results.curr = page;
    // Paginated
    const startIdx = (page - 1) * 9;
    if (products.length >= 9) {
      results.next = page + 1;
    } else {
      results.curr = page;
      results.next = results.curr + 1;
      results.prev = results.curr - 1;
    }

    if (startIdx > 0) {
      results.prev = page - 1;
    } else {
      results.prev = 1;
      results.curr = 2;
      results.next = 3;
    }
    results.products = products;

    // results.products = products;
    res.render("product/views/products", { results });
    // res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Lay list cac san pham
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.getAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const products = await productService.getAll(limit);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRelatedProducts = async (req, res) => {
  try {
    const relatedProduct = await productService.getRelatedProducts(
      req.query._id,
      req.query.producer,
      4
    );

    res.json(relatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
