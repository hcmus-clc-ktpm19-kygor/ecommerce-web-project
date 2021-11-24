const model = require('../models/discount');

exports.get = async (req, res) => {
  try {
    const discount = await model.findById(req.params.id);
    if (discount === null) {
      return res.status(404).json({mess: `Discount id '${req.params.id}' not found`});
    }

    res.json(discount);
  } catch (e) {
    res.status(400).json({ mess: e.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const discounts = await model.find();
    res.json(discounts);
  } catch (e) {
    res.status(400).json({ mess: e.message });
  }
};

exports.insert = async (req, res) => {
  const discount = new model(req.body);
  try {
    const newOrder = await discount.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ mess: err.message });
  }
}