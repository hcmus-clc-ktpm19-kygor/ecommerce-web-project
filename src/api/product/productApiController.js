const service = require("../../components/product/productService");
const productService = require("../../components/product/productService");

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
    req.app.locals.products = await productService.getAllProduct();

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByName = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // trang thu n
    const products = await service.getByName(req.query.name, page, req.app.locals.products);

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
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.filterProducts = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // trang thu n
    const category = req.query.category || "";
    const producer = req.query.producer || "";
    const products = await service.filterProducts(page, category, producer);

    const results = {};
    results.curr = page;
    // Paginated
    const startIdx = (page - 1) * 9;
    if (products.length >= 9) {
      results.next = page + 1;
    } else {
      results.curr = page;
      results.next = {
        page: results.curr + 1,
        filter: `category=${category}&producer=${producer}`,
      };
      results.prev = {
        page: results.curr - 1,
        filter: `category=${category}&producer=${producer}`,
      };
    }

    if (startIdx > 0) {
      results.prev = page - 1;
    } else {
      results.prev = {
        page: 1,
        filter: `category=${category}&producer=${producer}`,
      };
      results.curr = {
        page: 2,
        filter: `category=${category}&producer=${producer}`,
      };
      results.next = {
        page: 3,
        filter: `category=${category}&producer=${producer}`,
      };
    }
    results.products = products;
    req.app.locals.products = await service.filterProductsAll(category, producer);

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sortingProducts = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // trang thu n
    const products = await service.sortingProducts(page, req.query["sort-by"]);

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
    req.app.locals.products = await service.sortingProductsAll(req.query["sort-by"]);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
