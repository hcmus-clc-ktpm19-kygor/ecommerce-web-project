const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    // Schema attributes are defined here
    name: String,
    email: String,
    phone: String,
    content: String,
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: { createdAt: true, updatedAt: false }, versionKey: false });

// Create account model in db
module.exports = mongoose.model('comment', commentSchema, 'comment');