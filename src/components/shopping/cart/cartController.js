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
      if (req.session.guest_id !== req.user._id){

        cart = await cartService.getCartByGuestId(req.session.guest_id);
        if(cart !== null && cart.user_id === null){
          if(await cartService.getCartByUserId(req.user._id)){
            await cartService.removeCart(cart);
            cart = await cartService.getCartByUserId(req.user._id);
          } else {
            await cartService.synchronizeCart(req.user._id, cart);
            req.session.guest_id = req.user._id;
          }
        } else {
          cart = await cartService.getCartByUserId(req.user._id);
          req.session.guest_id = req.user._id;
        }
      } else {
        cart = await cartService.getCartByUserId(req.user._id);
      }
    }
    res.render('shopping/cart/views/cart', {cart});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};