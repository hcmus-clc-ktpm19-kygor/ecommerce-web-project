const commentModel = require("./commentModel");
const mongoose = require('mongoose');

/**
 * Phan trang comment, moi trang 5 comment
 * @param page
 * @returns {Promise<void>}
 */
exports.getComment = async (page) => {
    try {
        let perPage = 5; // so luong comment xuat hien trong 1 trang
        page = page || 1;

        return await commentModel
            .find() // find tất cả các data
            .skip((perPage * page) - perPage)
            .limit(perPage).lean();
    } catch (err) {
        throw err;
    }
};

/**
 * Them comment moi vao database
 * @param newComment
 * @returns {Promise<>}
 */
module.exports.postComment = async ({ name, email, phone, content, product_id }) => {
    try {
        product_id = mongoose.Types.ObjectId.createFromHexString(product_id);
        const comment = new commentModel({ name, email, phone, content, product_id });
        return await comment.save();
    } catch (err) {
        throw err;
    }
}