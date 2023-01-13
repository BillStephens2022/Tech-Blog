const router = require('express').Router();
const { Comment, Post, User } = require('../../models');



// Create Post
router.post('/', async (req, res) => {
    try {
      console.log('Creating Comment!')
      const newCommentData = await Comment.create({
          comment_content: req.body.comment_content,
          post_id: req.body.post_id,
          user_id: req.session.user_id
      })
      res.json(newCommentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;