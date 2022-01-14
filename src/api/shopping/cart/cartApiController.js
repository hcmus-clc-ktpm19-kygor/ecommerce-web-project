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

    const {content} = req.body;

    const quantity = parseInt(content) || 1;

    if(quantity <= product.stock){
      let cart;
      if (!req.user) {
        cart = await cartService.getCartByGuestId(req.session.guest_id);
        if (cart === null) {
          cart = await cartService.insertCartGuest(req.session.guest_id);
        }
      } else {
        cart = await cartService.getCartByUserId(req.user._id);
        if (req.session.guest_id !== req.user._id) {
          const guestCart = await cartService.getCartByGuestId(
              req.session.guest_id);
          if (cart === null) {
            if (guestCart !== null) {
              if (guestCart.user_id === null) {
                cart = await cartService.synchronizeCart(req.user._id,
                    guestCart);
                req.session.guest_id = req.user._id;
              } else {
                cart = await cartService.insertCartUser(req.user._id);
              }
            } else {
              cart = await cartService.insertCartUser(req.user._id);
              req.session.guest_id = req.user._id;
            }
          }
        } else {
          if (cart === null) {
            cart = await cartService.insertCartUser(req.user._id);
          }
        }
      }
      const newCart = await cartService.addProductToCart(product, cart,quantity);
      await cartService.updateToTalCost(newCart);
      res.status(201).json('Added successfully');
    } else {
      res.status(201).json({stock: product.stock});
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

