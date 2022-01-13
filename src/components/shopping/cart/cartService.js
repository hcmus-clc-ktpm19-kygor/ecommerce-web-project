const cartModel = require("./cartModel");
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
        user_id: ObjectId.createFromHexString(id),
      })
      .lean();
  } catch (err) {
    throw err;
  }
};

/**
 * Thêm cart của guest mới vào database
 * @param guest_id
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.insertCartGuest = async function (guest_id) {
  try {
    const newCart = new cartModel({
      guest_id: guest_id,
      user_id: null,
      products: Array,
      quantity_total: null,
      cost_total: null,
    });
    return await newCart.save();
  } catch (err) {
    throw err;
  }
};

/**
 * Thêm cart của user mới vào database
 * @param user_id
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.insertCartUser = async function (user_id) {
  try {
    const newCart = new cartModel({
      guest_id: user_id,
      user_id: ObjectId.createFromHexString(user_id),
      products: Array,
      quantity_total: null,
      cost_total: null,
    });
    return await newCart.save();
  } catch (err) {
    throw err;
  }
};

/**
 * Đồng bộ cart của user và guest mới vào database
 * @param user_id
 * @param cart
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.synchronizeCart = async function (user_id, cart) {
  try {
    await cartModel.findOneAndUpdate(
      { _id: cart._id },
      {
        $set: {
          user_id: ObjectId.createFromHexString(user_id),
          guest_id: user_id,
        },
      }
    );
    return await cartModel.findOne({ _id: cart._id });
  } catch (err) {
    throw err;
  }
};

/**
 * update cart
 * @param cart
 * @returns {Promise<void>}
 */
exports.updateCart = async function (cart) {
  try {
    await cartModel.findOneAndUpdate(
      { _id: cart._id },
      { $set: { products: Array, cost_total : 0 }}
    );
  } catch (err) {
    throw err;
  }
};

/**
 * xóa cart của user
 * @param cart
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.removeCart = async function (cart) {
  try {
    await cartModel.deleteOne({ _id: cart._id });
  } catch (err) {
    throw err;
  }
};

/**
 * xóa sp của user
 * @param cart
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.deleteProduct = async function (cart, product_id) {
  try {
    await cartModel.updateOne(
        { _id: cart._id},
        { $pull: { products : { id : ObjectId.createFromHexString(product_id) } }}
    );
    return cartModel.findById(cart._id);
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
exports.addProductToCart = async function (product, cart, qty) {
  try {
    const quantity = qty.qty || 1;
    const small_product = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity),
      image_url: product.image_url,
    };

    const exists_product = await cartModel.findOne({
      _id: cart._id,
      products: {
        $elemMatch: { id: small_product.id },
      },
    });

    if (exists_product) {
      await cartModel.findOneAndUpdate(
        { _id: cart._id },
        { $inc: { "products.$[p].quantity": parseInt(quantity) } },
        {
          arrayFilters: [{ "p.id": small_product.id }],
        }
      );
    } else {
      await cartModel.findOneAndUpdate(
        { _id: cart._id },
        { $push: { products: small_product } }
      );
    }

    return await cartModel.findById(cart._id).lean();
  } catch (err) {
    throw err;
  }
}


/**
 * lấy số lượng giỏ hàng
 * @param cart
 * @returns {Promise<Document<any, any, unknown> & Require_id<unknown>>}
 */
exports.updateToTalCost = async function (cart) {
  try {
    let cost_total = 0;
    for(let i=0; i< cart.products.length ; i++){
      cost_total += cart.products[i].price * cart.products[i].quantity
    }

    await cartModel.findOneAndUpdate(
        { _id: cart._id },
        { $set: { cost_total: cost_total } }
    );
  } catch (err) {
    throw err;
  }
};


/**
 * lấy số lượng giỏ hàng
 * @param guest_id
 * @returns {number}
 */
exports.getGuestCartSize = async function (guest_id) {
  try {
    const cart = await cartModel
    .findOne({
      guest_id: guest_id,
    })
    .lean();
    if(cart === null)
      return 0;
    else
      return cart.products.length;
  } catch (err) {
    throw err;
  }
};

/**
 * lấy số lượng giỏ hàng
 * @param user_id
 * @returns {number}
 */
exports.getUserCartSize = async function (user_id) {
  try {
    const cart = await cartModel
    .findOne({
      user_id: ObjectId.createFromHexString(user_id),
    })
    .lean();
    if(cart === null)
      return 0;
    else
      return cart.products.length;
  } catch (err) {
    throw err;
  }
};
