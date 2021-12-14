const commentService = require("../../components/comment/commentService");

/**
 * Phan trang comment
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.getComment = async (req, res) => {
    try {
        const comments = await commentService.getComment(req.query.page);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/**
 * Them comment moi vao database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.postComment = async (req, res) => {
    try {
        const newComment = await commentService.postComment(req.body);
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}