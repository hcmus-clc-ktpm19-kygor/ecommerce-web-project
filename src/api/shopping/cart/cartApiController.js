const cartService = require("../../../components/shopping/cart/cartService");
const model = require("../../../components/product/productModel");

/**
 * Thêm sp mới vào cart
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.insertProductToCart = async function (req, res) {
  try {
    const product = await model.findById(req.params.id).lean();
    let cart;
    if(!req.user){
      cart = await cartService.getCartByGuestId(req.session.guest_id);
      if(cart === null){
        cart = await cartService.insertCartGuest(req.session.guest_id);
      }
    } else {
      if (req.session.guest_id !== req.user._id) {
        cart = await cartService.getCartByGuestId(req.session.guest_id);
        if(cart === null) {
          cart = await cartService.insertCartGuest(req.session.guest_id);
        }
        if (await cartService.getCartByUserId(req.user._id)) {
          await cartService.removeCart(cart);
          cart = await cartService.getCartByUserId(req.user._id);
        } else {
          await cartService.synchronizeCart(req.user._id, cart);
          req.session.guest_id = req.user._id;
        }
      } else {
        cart = await cartService.getCartByUserId(req.user._id);
        if (cart === null) {
          cart = await cartService.insertCartUser(req.user._id);
        }
      }
    }
    await cartService.addProductToCart(product, cart);
    res.status(201);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

