const model = require('./productModel');
const mongoose = require('mongoose');

/**
 * Lay 1 product bang id <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param id {@link String}
 * @returns {Promise<{product: model}|{mess: string}>}
 */
exports.get = async (id) => {
  try {
    const product = await model.findById(mongoose.Types.ObjectId.createFromHexString(id));
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

exports.update = async (id, updateProduct) => {
  try {
    return await model.findByIdAndUpdate(mongoose.Types.ObjectId.createFromHexString(id), updateProduct,
        { new: true });
  } catch (err) {
    throw err;
  }
}