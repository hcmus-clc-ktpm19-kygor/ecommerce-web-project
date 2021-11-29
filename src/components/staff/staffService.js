const model = require('./staffModel');

exports.get = async (id) => {
  try {
    const staff = await model.findById(id);
    if (staff === null) {
      return {mess: `Staff id '${id}' not found`};
    }
    return staff;
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await model.find();
  } catch (err) {
    throw err;
  }
};

exports.insert = async (newStaff) => {
  const staff = new model(newStaff);
  try {
    return await staff.save();
  } catch (err) {
    throw err;
  }
}