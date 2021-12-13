const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all data for plotting map sites and hover over sites
router.get('/', (req, res) => {
  // GET route code here

  let queryTextForMap = `
  SELECT * FROM "sites"
  JOIN "languages" ON "languages".id = "sites".languages_id
  `
    pool.query(queryTextForMap)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
});


//get all for map language detail
router.get



module.exports = router;