const model = require('./accountModel');
const mongoose = require('mongoose');

/**
 * Lay 1 san pham len tu database bang id
 * @param id {@link mongoose.Types.ObjectId}
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.get = async (id) => {
  try {
    const account = await model.findById(id);
    if (account === null) {
      return { mess: `Account id '${id}' not found` };
    }
    return account;
  } catch (err) {
    throw err;
  }
};

/**
 * Lay 1 list cac san pham tu database
 * @returns {Promise<[account: model]>}
 */
module.exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

/**
 * Them san pham moi vao database
 * @param newAccount
 * @returns {Promise<{account: model}>}
 */
module.exports.insert = async (newAccount) => {
  const account = new model(newAccount);
  try {
    return await account.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id
 * @param updateAccount
 * @returns {Promise<{account: model}>}
 */
exports.update = async (id, updateAccount) => {
  try {
    return await model.findByIdAndUpdate(id, updateAccount,
        { new: true });
  } catch (err) {
    throw err;
  }
}

/**
 * Tim tai khoan bang id xoa khoi database
 * @param id
 * @returns {Promise<*>}
 */
exports.delete = async (id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}