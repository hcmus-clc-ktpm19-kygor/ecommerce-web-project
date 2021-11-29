const model = require('./productModel');

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

exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

exports.insert = async (newProduct) => {
  const product = new model(newProduct);
  try {
    return await product.save();
  } catch (err) {
    throw err;
  }
}