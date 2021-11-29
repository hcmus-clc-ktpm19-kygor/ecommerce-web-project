const model = require('./customerModel');
const mongoose = require('mongoose');

exports.get = async (id) => {
  try {
    const customer = await model.findById(mongoose.Types.ObjectId.createFromHexString(id));
    if (customer === null) {
      return { mess: `Customer id '${id}' not found` };
    }
    return customer;
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

exports.insert = async (newCustomer) => {
  const customer = new model(newCustomer);
  try {
    return await customer.save();
  } catch (err) {
    throw err;
  }
}