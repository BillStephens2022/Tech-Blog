const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userPostData = await Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ['id', 'post_title', 'post_content', 'date_created'],
        include: [{ 
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment_content', 'date_created', 'post_id', 'user_id'],
          }
        ]

    })
      const posts = userPostData.map((post) => post.get({ plain: true }));

      res.render('dashboard', {
        posts,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/new-post', (req, res) => {
    res.render('new-post', {
        loggedIn: true
    })
})

  module.exports = router;