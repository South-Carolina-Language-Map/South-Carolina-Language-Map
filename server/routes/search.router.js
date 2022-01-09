const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET for search function
router.get('/', (req, res) => {

    console.log('this is req.query ==>', req.query);
    let values = [];
    let columns = [];

    //Loop through req.query and separate keys and values into parallel arrays
    for (let key in req.query) {
        //push appropriate SQL reference for current key into columns
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
                columns.push(`"sites".site_name`)
                break;
            default:
                console.log('===switch error===', key)
                break;
        }

        //push corresponding value into values (at same position);
        values.push(`%${req.query[key]}%`)
    } //end loop

    
    //flexible search query connected to all databases
    console.log('COLUMNS', columns)
    console.log('VALUES', values);
    searchQueryText = `
    SELECT 
    sites.id, latitude, longitude, sites.language_id, site_name, region_id, address,
    language, glottocode, global_speakers, sc_speakers,
    endonym, category_id, description, status, link_text, hyperlink
    FROM "sites"
    JOIN "regions" ON "regions".id = "sites".region_id
    JOIN "languages" ON "languages".id = "sites".language_id
    JOIN "categories" ON "languages".category_id = "categories".id
    LEFT JOIN "examples" ON "languages".id = "examples".language_id
    WHERE ${columns[0]} ILIKE $1
    `;

    //loop for multiple search queries in values array
    for (let i = 1; i < values.length; i++) {
        searchQueryText += `AND ${columns[i]} ILIKE $${i + 1}`;
      } 

      //add the the ORDER BY at the end (arbitrarily ordered by the last column)
      searchQueryText += ` ORDER BY ${columns[columns.length -1]} ASC;`
      console.log('-------', searchQueryText);

      //spread values to account for added interpolated data
    pool.query(searchQueryText, [...values])
        .then((result) => {
            console.log('-------------', result, result.rows)
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });

});

module.exports = router;