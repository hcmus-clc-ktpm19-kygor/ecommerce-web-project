const cartService = require("../../../components/shopping/cart/cartService");

/**
 * Lấy giỏ hàng của các tài khoản chưa đăng nhập
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.getCart = async function (req, res) {
  try {
    let cart;
    if (req.query["guest-id"]) {
      cart = await cartService.getCartByGuestId(req.query["guest-id"]);
    } else {
      cart = await cartService.getCartByUserId(req.query.id);
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Thêm cart mới vào database
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.insertCart = async function (req, res) {
  try {
    const newCart = await cartService.insertCart(req.body);
    res.status(201).json(newCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
