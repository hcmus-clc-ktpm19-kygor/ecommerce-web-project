const model = require('./offerModel');
const mongoose = require("mongoose");

exports.get = async (id) => {
  try {
    const offer = await model.findById(mongoose.Types.ObjectId.createFromHexString(id));
    if (offer === null) {
      return {mess: `Offer id '${id}' not found`};
    }
    return offer;
  } catch (err) {
    throw err;
  }
};

exports.getAll = async (req, res) => {
  try {
    return await model.find();
  } catch (err) {
    throw err
  }
};

exports.insert = async (newOffer) => {
  const offer = new model(newOffer);
  try {
    return await offer.save();
  } catch (err) {
    throw err;
  }
}