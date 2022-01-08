const cartService = require("./cartService");

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
    if(!req.user){
      cart = await cartService.getCartByGuestId(req.session.guest_id);
    } else {
      cart = await cartService.getCartByUserId(req.user._id);
    }
    res.render('shopping/cart/views/cart', {cart})
    // res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};