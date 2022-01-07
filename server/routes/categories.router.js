const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


//GET all from category list
router.get('/', (req, res) => {
  console.log(req.user)
  pool.query(`SELECT * FROM "categories";`)
    .then((response) => {
      res.send(response.rows);
      console.log('GET Categories success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in Categories GET', err);
    })
});


//POST - add new category
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.user)
  const name = req.body.name;

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {
    const queryText = `
  INSERT INTO "categories" (name)
  VALUES ($1);
  `;

    pool.query(queryText, [name])
      .then(() => {
        res.sendStatus(201);
        console.log('POST Categories success');
      })
      .catch((err) => {
        sendStatus(500);
        console.log('ERROR in Categories POST', err);
      });
  } else {
    res.sendStatus(403)
  } //end if conditional
});


//PUT - edit a specific category
router.put('/:id', (req, res) => {
  console.log('=================', req.params, req.body)
  const id = req.params.id;
  const name = req.body.name;

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {

    const queryText = `
  UPDATE "categories"
  SET "name" = $1
  WHERE "id" = $2
  ;`

    pool.query(queryText, [name, id])
      .then(() => {
        res.sendStatus(200);
        console.log('PUT Categories success');
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log('ERROR in Categories PUT', err);
      })
  } else {
    res.sendStatus(403)
  } //end if conditional
});


//DELETE a specific category
router.delete('/:id', (req, res) => {
  const categoryID = req.params.id;

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {

    const queryText = `
  DELETE FROM "categories" WHERE "id" = $1
  ;`

    pool.query(queryText, [categoryID])
      .then(() => {
        console.log('DELETE Categories success')
        res.sendStatus(200)
      })
      .catch((err) => {
        console.log('ERROR in Categories DELETE', err);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403)
  } //end if conditional
});



module.exports = router;