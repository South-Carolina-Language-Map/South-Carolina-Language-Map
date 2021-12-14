const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();







//******NICKs EYEBALLS HERE */
//Add a site from the admin Side
router.post('/', async function (req, res) {
    console.log('This is req.body in POST sites', req.body)

    //function to get geotag (lat/long) from address
    const string = site.address.replace(/\s/g, '%20');

    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${accessToken}`);

    let coords = response.data.features[0].center; // gives an array [lat, long];

    //query to insert new site into database
    let queryTextForPost = `
         INSERT INTO "sites" ("latitude", "longitude", "language_id", "site_name", "region_id", "address")
         VALUES($1, $2, $3, $4, $5, $6);
         `;

    //package up nicely in a variable for readability
    let values = [coords[0], coords[1], req.body.language_id, req.body.site_name, req.body.region_id, req.body.address]

    //hit up pool 
    pool.query(queryTextForPost, values)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
}); //end GET for map sites and hover

module.exports = router;

router.put