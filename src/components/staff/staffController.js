const service = require('./staffService');

exports.get = async (req, res) => {
  const staff = await service.get(req.params.id);
  res.json(staff);
};

exports.getAll = async (req, res) => {
  const staffs = await service.getAll();
  res.json(staffs);
};

exports.insert = async (req, res) => {
  const newStaff = service.insert(req.body);
  res.json(newStaff);
}