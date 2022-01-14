const service = require("./orderService");
const checkoutService = require("../shopping/checkout/checkoutService");
const cartService = require("../shopping/cart/cartService");

exports.get = async (req, res) => {
  try {
    const order = await service.get(req.params.id);
    res.render("order/views/order_detail", { order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const orders = await service.getAll(req.params.id);
    res.render("order/views/orders", { orders });
    //res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTop10BestSeller = async (req, res) => {
  try {
    const bestSeller = await service.getTop10BestSeller();
    res.json(bestSeller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.insert = async (req, res) => {
  try {
    if(req.user) {
      const checkout = await checkoutService.getByUserId(req.user._id);
      const newOrder = await service.insert(checkout, req.body);
      if(newOrder !== null){
        await cartService.updateCart(checkout.cart);
        const path = '/order/user/' + req.user._id;
        res.redirect(path);
      } else {
        const message = "Số lượng sản phẩm vượt quá số lượng tồn";
        res.render("shopping/checkout/views/checkout", {message, checkout});
      }

    } else {
      res.redirect('login')
    }
  } catch (err) {
    res.stats(400).json({ message: err.message });
  }
};

/**
 * Tim va Update order da co trong database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    res.redirect("/order");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Tim va xoa order trong database
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.redirect("/order");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
