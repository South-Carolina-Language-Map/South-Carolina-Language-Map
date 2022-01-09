const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all data for plotting map sites and hover over sites
router.get('/', (req, res) => {

    //query to get geolocation and language variety +id for map view
    let queryTextForMap = `
    SELECT sites.id, latitude, longitude, language_id, language, category_id
    FROM "sites"
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


//GET all for map language detail
router.get('/:id', (req, res) => {
    const siteID = req.params.id

    //query for details on a specific detail and all the data associated with it
    let queryTextForLanguageDetails = `
    SELECT * FROM "sites"
    JOIN "regions" ON "regions".id = "sites".region_id
    JOIN "languages" ON "languages".id = "sites".language_id
    JOIN "categories" ON "languages".category_id = "categories".id
    LEFT JOIN "examples" ON "languages".id = "examples".language_id
    WHERE "sites".id = $1;
    `;

    pool.query(queryTextForLanguageDetails, [siteID])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //end GET all for details



module.exports = router;