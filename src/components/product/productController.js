const service = require('./productService');

// Lay 1 san pham len bang id
exports.get = async (req, res) => {
  const product = await service.get(req.params.id);
  res.json(product);
};

// Lay list cac san pham
exports.getAll = async (req, res) => {
  const products = await service.getAll();
  res.json(products);
};

// Them san pham moi vao database tra ket qua neu thanh cong
exports.insert = async (req, res) => {
  const newProduct = await service.insert(req.body);
  res.json(newProduct);
}

// Tim va Update san pham da co trong database tra ket qua neu thanh cong
exports.update = async (req, res) => {
  const updatedProduct = await service.update(req.params.id, req.body);
  res.json(updatedProduct);
}