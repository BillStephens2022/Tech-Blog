const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', (req, res) => {
    console.log('GET request received!');
});

// Create Post
router.post('/', async (req, res) => {
  try {
    console.log('Creating Post!')
    const newPostData = await Post.create({
        post_title: req.body.title,
        post_content: req.body.content,
        user_id: req.session.user_id
    })
    res.json(newPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;