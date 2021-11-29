const model = require('./discountModel');
const mongoose = require('mongoose');

exports.get = async (id) => {
  try {
    const discount = await model.findById(mongoose.Types.ObjectId.createFromHexString(id));
    if (discount === null) {
      return { mess: `Discount id '${id}' not found` };
    }
    return discount;
  } catch (err) {
    throw err
  }
};

exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

exports.insert = async (newDiscount) => {
  const discount = new model(newDiscount);
  try {
    return await discount.save();
  } catch (err) {
    throw err;
  }
}