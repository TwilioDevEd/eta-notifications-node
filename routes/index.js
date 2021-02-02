const express = require('express');
const router = express.Router();

// GET: /
router.get('/', function(_req, res) {
  res.render('index');
});


module.exports = router;
