const commentService = require("../../components/comment/commentService");

/**
 * Them comment moi vao database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.postComment = async (req, res) => {
    try {
        if(!req.user){
            res.status(401).json({
                message: 'Unauthorized'
            });
            return;
        }
        const {_id: user_id} = req.user;
        const {avatar_url: user_avatar_url} = req.user;
        const {username: user_name} = req.user;
        const {content} = req.body;
        const newComment = await commentService.postComment(user_id, user_avatar_url, user_name, req.params.id, content);
        res.status(201).json(newComment);
    } catch (err) {
        res.status(402).json({ message: err.message });
    }
}