const model = require('./accountModel');
const service = require('./accountService');

exports.get = async (req, res) => {
  const account = await service.get(req.params.id);
  res.json(account);
};

exports.getAll = async (req, res) => {
  const accounts = await service.getAll();
  res.json(accounts);
};

exports.insert = async (req, res) => {
  const newAccount = await service.insert(req.body);
  res.json(newAccount);
}