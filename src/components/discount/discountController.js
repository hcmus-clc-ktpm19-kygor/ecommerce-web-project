const service = require('./discountService');

exports.get = async (req, res) => {
  const discount = await service.get(req.params.id);
  res.json(discount);
};

exports.getAll = async (req, res) => {
  const discounts = await service.getAll();
  res.json(discounts);
};

exports.insert = async (req, res) => {
  const discount = await service.insert(req.body);
  res.json(discount);
}