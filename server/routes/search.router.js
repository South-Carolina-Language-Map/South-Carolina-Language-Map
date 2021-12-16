const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

require('dotenv');


//req.query
//GET for search function
router.get('/', (req, res) => {

    console.log('this is req.query ==>', req.query);
    let values = [];
    let columns = [];

    for (let key in req.query) {
        switch (key) {
            case 'category':
                columns.push(`"categories".name`)
                break;
            case 'region':
                columns.push(`"regions".name`)
                break;
            case 'language':
                columns.push(`"language"`)
                break;
            case 'site':
                columns.push(`"site".site_name`)
                break;
            default:
                console.log('==switch error===', key)
                break;
        }

        values.push(`%${req.query[key]}%`)
    } //end loop

    console.log(values);
    searchQueryText = `
    SELECT * FROM "sites"
    JOIN "regions" ON "regions".id = "sites".region_id
    JOIN "languages" ON "languages".id = "sites".language_id
    JOIN "categories" ON "languages".category_id = "categories".id
    WHERE ${columns[0]} ILIKE $1 ORDER BY ${columns[0]} ASC;
    `;


    pool.query(searchQueryText, values)
        .then((result) => {
            console.log('-------------', result, result.rows)
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });

});

module.exports = router;