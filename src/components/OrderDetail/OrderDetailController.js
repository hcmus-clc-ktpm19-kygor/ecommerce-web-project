const service = require('./OrderDetailService');

exports.get = async (req, res) => {
  const orderDetail = await service.get(req.params.id);
  res.json(orderDetail);
};

exports.getAll = async (req, res) => {
  const ordersDetail = await service.getAll();
  res.json(ordersDetail);
};

exports.insert = async (req, res) => {
  const newOrderDetail = service.insert(req.body);
  res.json(newOrderDetail);
}