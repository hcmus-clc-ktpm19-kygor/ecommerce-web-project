const commentModel = require("./commentModel");

/**
 * Phan trang comment, moi trang 10 comment
 * @param page
 * @returns {Promise<void>}
 */
exports.getComment = async (page, product_id) => {
    try {
        let perPage = 10; // so luong comment xuat hien trong 1 trang
        page = page || 1;
        const comments = await commentModel
            .find({product_id})
            .sort( [['createdAt', 'descending']])
            .skip((perPage * page) - perPage)
            .limit(perPage).lean();
        return comments;
    } catch (err) {
        throw err;
    }
};

/**
 * Them comment moi vao database
 * @param newComment
 * @returns {Promise<>}
 */
module.exports.postComment = async (user_id, user_avatar_url, user_name, product_id, content) => {
    try {
        const comment = new commentModel({
            user_id: user_id,
            user_avatar_url:user_avatar_url,
            user_name: user_name,
            product_id: product_id,
            content: content,
        });
        return await comment.save();
    } catch (err) {
        throw err;
    }
}