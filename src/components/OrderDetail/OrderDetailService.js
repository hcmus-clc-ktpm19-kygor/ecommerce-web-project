const model = require('./OrderDetailModel');
const mongoose = require('mongoose');

exports.get = async (id) => {
  try {
    const orderDetail = await model.findById(mongoose.Types.ObjectId.createFromHexString(id));
    if (orderDetail === null) {
      return {mess: `Product id '${id}' not found`};
    }
    return orderDetail;
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

exports.insert = async (newOrderDetail) => {
  const orderDetail = new model(newOrderDetail);
  try {
    return await orderDetail.save();
  } catch (err) {
    throw err;
  }
}