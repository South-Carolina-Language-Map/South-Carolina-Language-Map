const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  pool.query(`SELECT * FROM "regions";`)
  .then((response) => {
    res.send(response.rows);
    console.log('Regions GET successful');
  })
  .catch((err) => {
    res.sendStatus(500);
    console.log('ERROR in Regions GET', err);
  })
});


module.exports = router;