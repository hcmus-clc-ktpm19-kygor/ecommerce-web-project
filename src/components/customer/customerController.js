const service = require('./customerService');

exports.get = async (req, res) => {
  const customer = await service.get(req.params.id);
  res.json(customer);
};

exports.getAll = async (req, res) => {
  const customers = await service.getAll();
  res.json(customers);
};

exports.insert = async (req, res) => {
  const newCustomer = service.insert(req.body);
  res.json(newCustomer);
}