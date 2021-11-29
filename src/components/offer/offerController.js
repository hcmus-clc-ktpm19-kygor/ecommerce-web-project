const service = require('./offerService');

exports.get = async (req, res) => {
  const offer = await service.get(req.params.id);
  res.json(offer);
};

exports.getAll = async (req, res) => {
  const offers = await service.getAll();
  res.json(offers);
};

exports.insert = async (req, res) => {
  const newOffer = service.insert(req.body);
  res.json(newOffer);
}