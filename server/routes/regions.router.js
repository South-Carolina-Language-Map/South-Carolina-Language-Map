const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all regions
router.get('/', (req, res) => {
  pool.query(`SELECT * FROM "regions";`)
  .then((response) => {
    res.send(response.rows);
  })
  .catch((err) => {
    res.sendStatus(500);
    console.log('ERROR in Regions GET', err);
  })
});


module.exports = router;