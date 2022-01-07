const axios = require('axios');

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

require('dotenv');


//*** GET in maps.router***


//function to create geotags for POST route - being called in POST
async function createGeoTag(req, res) {
    console.log('This is req.body in POST sites', req.body)
    console.log(req.user)

    //security - for admin use only
    const clearanceLevel = req.user.clearance_level

    if (clearanceLevel >= 1) {

        //function to get geotag (lat/long) from address
        const string = req.body.address.replace(/\s/g, '%20').replace(/'/g, '%27');

        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`);

        let coords = response.data.features[0].center; // gives an array [lat, long];

        //query to insert new site into database
        let queryTextForPost = `
         INSERT INTO "sites" ("longitude", "latitude", "language_id", "site_name", "region_id", "address")
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
            });

    } else {
        res.sendStatus(403);
    } //end if conditional 

};

// GET - GET all sites
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM sites`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((err) => {
            console.log(err);
        });
})

//POST - Add a site from the admin Side
router.post('/', (req, res) => createGeoTag(req, res)); //end GET for map sites and hover


//PUT - edit a site
router.put('/:id', (req, res) => {
    console.log('IN SITES PUT ================>', req.body, req.params.id)
    const siteID = req.params.id;
    const editedSite = req.body;

    //security - for admin use only
    const clearanceLevel = req.user.clearance_level

    if (clearanceLevel >= 1) {

        const updateSiteQueryText = `
    UPDATE "sites"
    SET "address" = $1,
    "latitude" = $2,
    "longitude" = $3,
    "site_name" = $4,
    "region_id" = $5,
    "language_id" = $6
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
            });
    } else {
        res.sendStatus(403);
    } //end if conditional 

}); //End Site PUT


//DELETE a site
router.delete('/:id', (req, res) => {
    const siteID = req.params.id;

    //security - for admin use only
    const clearanceLevel = req.user.clearance_level

    if (clearanceLevel >= 1) {

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
            });
    } else {
        res.sendStatus(403);
    } //end if conditional 

}); //End Site DELETE




module.exports = router;

