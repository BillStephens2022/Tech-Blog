const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('dashboard');
  });

module.exports = router;