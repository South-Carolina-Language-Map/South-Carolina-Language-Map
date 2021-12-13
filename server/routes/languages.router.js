const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



//POST new language(1st query) and its examples (2nd query)
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log('This is REQ.BODY', req.body)

});

module.exports = router;