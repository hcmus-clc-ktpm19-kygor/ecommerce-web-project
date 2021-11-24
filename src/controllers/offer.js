const model = require('../models/offer');

exports.get = async (req, res) => {
  try {
    const offer = await model.findById(req.params.id);
    if (offer === null) {
      return res.status(404).json({mess: `Offer id '${req.params.id}' not found`});
    }

    res.json(offer);
  } catch (e) {
    res.status(400).json({ mess: e.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const offers = await model.find();
    res.json(offers);
  } catch (e) {
    res.status(400).json({ mess: e.message });
  }
};

exports.insert = async (req, res) => {
  const offer = new model(req.body);
  try {
    const newOrder = await offer.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ mess: err.message });
  }
}