const cartModel = require("./cartModel");
const model = require("../../product/productModel");
const { ObjectId } = require("mongoose").Types;

/**
 * Lấy giỏ hàng của các tài khoản chưa đăng nhập
 *
 * @param id id tạm của tài khoản chưa đăng nhập
 * @returns {Promise<void>}
 */
exports.getCartByGuestId = async function (id) {
  try {
    return await cartModel
      .findOne({
        guest_id: id,
      })
      .lean();
  } catch (err) {
    throw err;
  }
};

/**
 * Lấy giỏ hàng của các tài khoản đã đăng nhập
 *
 * @param id id của account
 * @returns {Promise<void>}
 */
exports.getCartByUserId = async function (id) {
  try {
    return await cartModel
      .findOne({
        customer_id: ObjectId.createFromHexString(id),
      })
      .lean();
  } catch (err) {
    throw err;
  }
};

/**
 * Thêm cart mới vào database
 * @param cart
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.insertCart = async function (cart) {
  try {
    const newCart = new cartModel(cart);

    return await newCart.save();
  } catch (err) {
    throw err;
  }
};

/**
 * Thêm sp mới vào cart
 * @param product_id
 * @param user_id
 * @returns {Promise<{mess: string}|Query<any, any, {}, any>>}
 */
exports.insertProductToCart = async function (product_id, user_id) {
  try {
    const product = await model.findById(product_id).lean();
    const small_product = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
    };

    console.log(small_product);
    // const cart = await cartModel.findOne({guest_id: guest_id,}).lean();
    const cart = await cartModel
      .findOne({
        customer_id: ObjectId.createFromHexString(user_id),
      })
      .lean();
    await cartModel.findOneAndUpdate(
      { _id: cart._id },
      { $push: { products: small_product } }
    );
  } catch (err) {
    throw err;
  }
};
