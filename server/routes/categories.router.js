const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/catagories', (req, res) => {
  pool.query(`SELECT * FROM "catagories";`)
    .then((response) => {
      res.send(response.rows);
      console.log('GET Catagories success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in Catagories GET', err);
    })
});

router.post('/catagories', (req, res) => {
  const name = req.body.category;
  const queryText = `
  INSERT INTO "catagories" (name)
  VALUES ($1);
  `;

  pool.query(queryText, [name])
    .then(() => {
      sendStatus(201);
      console.log('POST Catagories success');
    })
    .catch((err) => {
      sendStatus(500);
      console.log('ERROR in Catagories POST', err);
    });
});

router.put('/catagories/${id}', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const queryText = `
  UPDATE "category"
  SET "name" = $1
  WHERE "id" = $2
  ;`

  pool.query(queryText, [name, id])
    .then(() => {
      res.sendStatus(200);
      console.log('PUT Catagories success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in category PUT', err);
    })
});

router.delete('/categories/${id}', (req, res) => {
  const categoryID = req.params.id;
  const queryText = `
  DELETE FROM "catagories" WHERE "id" = $1
  ;`

  pool.query(queryText, [categoryID])
    .then(() => {
      console.log('DELETE Category success')
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('ERROR in category DELETE', err);
      res.sendStatus(500);
    })
});



module.exports = router;