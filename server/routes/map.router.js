const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all data for plotting map sites and hover over sites
router.get('/', (req, res) => {
 
//query to get geolocation and language variety +id for map view
  let queryTextForMap = `
  SELECT * FROM "sites"
  JOIN "languages" ON "languages".id = "sites".language_id
  `
    pool.query(queryTextForMap)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //end GET for map sites and hover


//get all for map language detail
router.get('/:id', (req, res) => {
    
    //query for details on a specific detail and all the data associated with it
    let queryTextForLanguageDetails = `
    SELECT * FROM "sites"
    JOIN "regions" ON "regions".id = "sites".region_id
    JOIN "languages" ON "languages".id = "sites".languages_id
    JOIN "examples" ON "languages".id = "examples".languages_id
    JOIN "catagories" ON "languages".category_id = "categories".id
    `

    pool.query(queryTextForLanguageDetails)
    .then((result) => {
        res.send(result.rows)
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
}); //end GET all for details



module.exports = router;