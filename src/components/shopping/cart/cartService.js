const cartModel = require('./cartModel');
const { ObjectId } = require("mongoose").Types;

/**
 * Lấy giỏ hàng của các tài khoản chưa đăng nhập
 *
 * @param id id tạm của tài khoản chưa đăng nhập
 * @returns {Promise<void>}
 */
exports.getCartByGuestId = async function(id) {
    try {
        return await cartModel.findOne({
          guest_id: id,
        }).lean();
    } catch (err) {
        throw err;
    }
}

/**
 * Lấy giỏ hàng của các tài khoản đã đăng nhập
 *
 * @param id id của account
 * @returns {Promise<void>}
 */
exports.getCartByUserId = async function(id) {
    try {
        return await cartModel.findOne({
          customer_id: ObjectId.createFromHexString(id),
        }).lean();
    } catch (err) {
        throw err;
    }
}

/**
 * Thêm cart mới vào database
 *
 * @param guestId id tạm của tài khoản chưa đăng nhập
 * @param customerId id của account
 * @param cart request body
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.insertCart = async function(cart) {
    try {
        const newCart = new cartModel(cart);

        return await newCart.save();
    } catch (err) {
        throw err;
    }
}