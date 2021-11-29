const service = require('./productService');

exports.get = async (req, res) => {
  const product = await service.get(req.params.id);
  res.json(product);
};

exports.getAll = async (req, res) => {
  const products = await service.getAll();
  res.json(products);
};

exports.insert = async (req, res) => {
  const newProduct = await service.insert(req.body);
  res.json(newProduct);
}