const service = require('./orderService');

exports.get = async (req, res) => {
  const order = await service.get(req.params.id);
  res.json(order);
};

exports.getAll = async (req, res) => {
  const orders = await service.getAll();
  res.json(orders);
};

exports.insert = async (req, res) => {
  const newOrder = service.insert(req.body);
  res.json(newOrder);
}