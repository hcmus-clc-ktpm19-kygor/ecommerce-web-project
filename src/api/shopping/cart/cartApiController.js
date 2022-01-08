const cartService = require("../../../components/shopping/cart/cartService");

/**
 * Thêm sp mới vào cart
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.insertProductToCart = async function (req, res) {
  try {
    // await cartService.insertProductToCart(req.params.id, req.session.guest_id);
    await cartService.insertProductToCart(req.params.id, req.user._id);
    res.status(201);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
