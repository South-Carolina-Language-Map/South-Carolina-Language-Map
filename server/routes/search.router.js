const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

require('dotenv');


//req.query
//GET for search function
router.get('/', (req, res) => {

    console.log('this is req.query ==>', req.query);


    searchQueryText = `
    SELECT * FROM "sites"
    JOIN "regions" ON "regions".id = "sites".region_id
    JOIN "languages" ON "languages".id = "sites".language_id
    JOIN "categories" ON "languages".category_id = "categories".id
    LEFT JOIN "examples" ON "languages".id = "examples".language_id
    WHERE $1 ILIKE $2 ORDER BY "name" ASC;
    `;

    params = [searchQueryText, [`%${req.query.key}%`]];

    pool.query(...params)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });


});

module.exports = router;