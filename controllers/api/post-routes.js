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

router.get('/:id', withAuth, async (req, res) => {
  console.log("single post requested!");
  console.log("Post ID:" + req.params.id);
  
  try {
    // Find the logged in user based on the post ID
    const singlePostData = await Post.findByPk(req.params.id, {
      attributes: ['id', 'post_title', 'post_content', 'date_created'],
        include: [
          { 
            model: User,
            attributes: [{exclude: password}],
          },
          {
            model: Comment
          }
        ],
    });

    const post = singlePostData.get({ plain: true });
    console.log(post);
    res.render('singlePost', post, {logged_in: req.session.logged_in});
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;