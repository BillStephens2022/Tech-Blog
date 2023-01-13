const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// GET all Posts for homepage
router.get('/', async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      attributes: ['id', 'post_title', 'post_content', 'user_id', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'post_id', 'user_id', 'date_created'],
        },
      ],
    })
    const posts = blogPostData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
      // We send over the current 'countVisit' session variable to be rendered
      countVisit: req.session.countVisit,
    })
    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      if (req.session.countVisit) {
        // If the 'countVisit' session variable already exists, increment it by 1
        req.session.countVisit++;
      } else {
        // If the 'countVisit' session variable doesn't exist, set it to 1
        req.session.countVisit = 1;
      }
    })
  } catch (err) {
      res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('register');
});

router.get('/post/:id', withAuth, async (req, res) => {
  console.log("single post requested!");
  console.log("Post ID:" + req.params.id);
  
  try {
    // Find the logged in user based on the post ID
    const singlePostData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_title', 'post_content', 'date_created'],
        include: [
          { 
            model: Comment,
            attributes: ['id','comment_content', 'post_id', 'user_id', 'date_created'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
    })
    const post = singlePostData.get({ plain: true });
    res.render('singlePost', {post, logged_in: req.session.logged_in});
    
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;