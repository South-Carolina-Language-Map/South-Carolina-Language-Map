const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

require('dotenv');


async function search(req, res) {
    //creating variable to hold search queries
    console.log('=========', req.query)
    let reducer = req.query;

    let queryString = '';

    //loop through to find if there are multiple from explore view
    for (let key in reducer) {
        if (queryString.length === 0) {
            queryString += '?';
        } else {
            //will need to add a search param if there are more than one
            queryString += '&';
        }
        
        let value = req.query[key]
        //add on new search param with each loop
        queryString += `${key}=${value}`;
        console.log('this is queryString====>', queryString)
    }

 
  //GET with axios and api key
    const response =
        await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${queryString}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`)
           .then((response) => {
            console.log(`SEARCH GET response ->`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.log(`Error in get ->`, err);
        });
}


 //req.query
//GET for search function
router.get('/', search, (req, res) => { });


module.exports = router;