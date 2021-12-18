const model = require('./accountModel');
const bcrypt = require('bcrypt');
const cloudinary = require('../../config/cloudinary.config');

/**
 * Lay 1 account len tu database bang id
 * @param id {@link mongoose.Types.ObjectId}
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getById = async (id) => {
  try {
    const account = await model.findById(id).lean();
    if (account === null) {
      return { mess: `Account id '${id}' not found` };
    }
    return account;
  } catch (err) {
    throw err;
  }
};

/**
 * Lay 1 account len tu database bang username
 * @param username
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getByUsername = async (username) => {
  try {
    return await model.findOne({username});
  } catch (err) {
    throw err;
  }
};

module.exports.validatePassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
}

/**
 * Them account moi vao database
 * @param newAccount
 * @returns {Promise<string>}
 */
module.exports.insert = async ({ username, email, password }) => {
  try {
    const isExisted_username = await model.exists({ username });
    const isExisted_email = await model.exists({ email });
    if (isExisted_username || isExisted_email ) {
      return null;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const account = new model({ username, password: hashedPassword, email });
      return await account.save();
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id user's id
 * @param updateUser
 * @param file
 * @returns {Promise<{account: model}>}
 */
exports.update = async (id, updateUser, file) => {
  try {
    // Upload avatar len cloudinary
    let result;
    if (file) {
      result = await cloudinary.uploader.upload(
          file.path,
          {
            public_id: id,
            folder: 'user_avatar',
            use_filename: true
          });
    }

    /*
     Lay avatar url
     Neu khong co avatar duoc up len, url bo trong
    */
    const { url } = result ?? "";
    // Update user's info
    updateUser.avatar_url = url;
    return await model.findByIdAndUpdate(id, updateUser,
        { new: true }).lean();
  } catch (err) {
    throw err;
  }
}
