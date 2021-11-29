const model = require('./orderModel');
const mongoose = require('mongoose');

exports.get = async (id) => {
  try {
    const order = await model.findById(mongoose.Types.ObjectId.createFromHexString(id));
    if (order === null) {
      return {mess: `Order id '${req.params.id}' not found`};
    }
    return order;
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

exports.insert = async (newOrder) => {
  const order = new model(newOrder);
  try {
    return await order.save();
  } catch (err) {
    throw err;
  }
}