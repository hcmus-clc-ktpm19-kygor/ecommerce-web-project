const model = require("./productModel");
const { paging } = require("./productService");

/**
 * Lay 1 product bang id <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param id {@link String}
 * @returns {Promise<{product: model}|{mess: string}>}
 */
exports.get = async (id) => {
  try {
    const product = await model.findById(id).lean();
    if (product === null) {
      return { mess: `Product id '${id}' not found` };
    }
    return product;
  } catch (err) {
    throw err;
  }
};

exports.getByName = async function(searchStr, page) {
  try {
    let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
    page = page || 1;

    const products = await model.find().lean();
    return products
      .filter((product) => product.name.toLowerCase().includes(searchStr))
      .slice(perPage * page - perPage, perPage);
  } catch (err) {
    throw err;
  }
};

/**
 * Phan trang cac product, moi trang co toi da 5 product
 * @param page
 * @returns {Promise<void>}
 */
exports.paging = async (page) => {
  try {
    let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
    page = page || 1;

    return await model
      .find() // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .lean();
  } catch (err) {
    throw err;
  }
};

/**
 * Lay list cac san pham <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @returns {Promise<[{product: model}]>}
 */
exports.getAll = async (limit) => {
  try {
    return await model
      .find({}, { name: true, price: true, image_url: true })
      .limit(limit)
      .lean();
  } catch (err) {
    throw err;
  }
};

/**
 * Lay list cac san pham <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @returns {Promise<[{product: model}]>}
 */
exports.getRelatedProducts = async (exceptProduct, producer, limit) => {
  try {
    const relatedProducts = await model
      .find(
        { $and: [{ producer }, { _id: { $ne: exceptProduct } }] },
        { name: true, price: true, image_url: true }
      )
      .limit(limit)
      .lean();

    relatedProducts.forEach((e) => {
      e.price = new Intl.NumberFormat("vn-VN", {
        currency: "VND"
      }).format(e.price);
    });

    return relatedProducts;
  } catch (err) {
    throw err;
  }
};

exports.filterProducts = async function(page, category, producer) {
  try {
    let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
    page = page || 1;

    if (category && producer) {
      return await model
        .find({
          $and: [{ category: category }, { producer: producer }]
        })
        .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .lean();
    } else if (producer) {
      return await model
        .find({ producer })
        .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .lean();
    } else if (category) {
      return await model
        .find({ category })
        .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .lean();
    }
    
    return await model
      .find({ category })
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .lean();
  } catch (err) {
    throw err;
  }
};

exports.sortingProducts = async function(page, sortBy) {
  try {
    let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
    page = page || 1;

    if (sortBy) {
      switch (sortBy) {
        case "price": {
          return await model
            .find() // find tất cả các data
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .sort({ price: "asc" })
            .lean();
        }
        case "name": {
          return await model
            .find() // find tất cả các data
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .sort({ name: "asc" })
            .lean();
        }

        case "category": {
          return await model
            .find() // find tất cả các data
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .sort({ category: "asc" })
            .lean();
        }
      }
    }

    return await paging(page);
  } catch (err) {
    throw err;
  }
};
