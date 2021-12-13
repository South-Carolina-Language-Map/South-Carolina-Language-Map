const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here

  let queryTextForMap = `
  SELECT * FROM "sites"
  JOIN "languages" ON "languages".id = "sites".languages_id
  `


});



module.exports = router;