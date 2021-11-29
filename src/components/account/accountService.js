const model = require('./accountModel');
const mongoose = require('mongoose');

module.exports.get = async (id) => {
  try {
    const account = await model.findById(mongoose.Types.ObjectId.createFromHexString(id));
    if (account === null) {
      return { mess: `Account id '${id}' not found` };
    }
    return account;
  } catch (err) {
    throw err;
  }
};

module.exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

module.exports.insert = async (newAccount) => {
  const account = new model(newAccount);
  try {
    return await account.save();
  } catch (err) {
    throw err;
  }
}