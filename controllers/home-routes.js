const router = require('express').Router();
const { User, Post, Comment } = require('../models');


// GET all Posts for homepage
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
    });
  
    const posts = postData.map((post) =>
    post.get({ plain: true })
    );
  
    req.session.save(() => {
      // We set up a session variable to count the number of times we visit the homepage
      if (req.session.countVisit) {
        // If the 'countVisit' session variable already exists, increment it by 1
        req.session.countVisit++;
      } else {
        // If the 'countVisit' session variable doesn't exist, set it to 1
        req.session.countVisit = 1;
    }
  
      res.render('homepage', {
          posts,
          // We send over the current 'countVisit' session variable to be rendered
          countVisit: req.session.countVisit,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;