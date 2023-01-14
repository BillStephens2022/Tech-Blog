const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { format_date } = require('../../utils/helpers');

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

// Delete a single post by id
router.delete('/:id', withAuth, async (req, res) => {
  await Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedpost) => {
      res.json(deletedpost);
    })
    .catch((err) => res.json(err));
});

module.exports = router;