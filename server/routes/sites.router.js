const axios = require('axios');

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router(); 




//GET in maps.router***

async function createGeoTag (req, res) {
    console.log('This is req.body in POST sites', req.body)

    //function to get geotag (lat/long) from address
    const string = req.body.address.replace(/\s/g, '%20');

    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${'pk.eyJ1IjoiYmxpbmd1c2Jsb25ndXMiLCJhIjoiY2t4MGt6Y3F5MGFrcDJzczZ0YjZnNXJlbCJ9.6EvtO1ovuEE8tBAePGwAag'}`);

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
};


//******NICKs EYEBALLS HERE */
//Add a site from the admin Side
router.post('/', (req, res) => createGeoTag(req,res)); //end GET for map sites and hover


//edit a site
router.put('/:id', (req, res) => {
    const siteID = req.params.id;
    const editedSite = req.body;
    const updateSiteQueryText = `
    UPDATE "sites"
    SET "address" = $1,
    "latitude" = $2,
    "longitude" = $3,
    "site_name" = $4,
    "region_id" = $5,
    "language_id" = $6,
    WHERE "id" = $7
    ;`;
    pool.query(updateSiteQueryText, [editedSite.address, editedSite.latitude, editedSite.longitude,
    editedSite.site_name, editedSite.region_id, editedSite.language_id, siteID])
        .then(() => {
            res.sendStatus(200);
            console.log('PUT Site success');
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log('ERROR in Site PUT', err);
        })
}); //End Site PUT


//delete a site
router.delete('/:id', (req, res) => {
    const siteID = req.params.id;
    const deleteSiteQueryText = `
    DELETE FROM "sites"
    WHERE "id" = $1
    ;`;
    pool.query(deleteSiteQueryText, [siteID])
        .then(() => {
            res.sendStatus(204);
            console.log('DELETE Site success');
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log('ERROR in DELETE Site', err);
        })
}); //End Site DELETE




module.exports = router;

