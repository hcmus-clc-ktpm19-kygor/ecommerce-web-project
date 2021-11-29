const model = require('./productModel');

/**
 * Lay 1 product bang id <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param id {@link String}
 * @returns {Promise<{product: model}|{mess: string}>}
 */
exports.get = async (id) => {
  try {
    const product = await model.findById(id);
    if (product === null) {
      return {mess: `Product id '${id}' not found`};
    }
    return product;
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
exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

/**
 * Them san pham moi vao database va tra ve ket qua san pham da them <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param newProduct
 * @returns {Promise<{product: model}>}
 */
exports.insert = async (newProduct) => {
  const product = new model(newProduct);
  try {
    return await product.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Tim san pham bang id, update thong tin san pham ton tai trong database
 *
 * @param id
 * @param updateProduct
 * @returns {Promise<{product: model}>}
 */
exports.update = async (id, updateProduct) => {
  try {
    return await model.findByIdAndUpdate(id, updateProduct,
        { new: true });
  } catch (err) {
    throw err;
  }
}

/**
 * Xoa san pham dang co trong database bang id
 *
 * @param id
 * @returns {Promise<{product: model}>}
 */
exports.delete = async (id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}