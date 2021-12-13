const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/languages', (req, res) => {
  pool.query(`SELECT * FROM "languages";`)
    .then(() => {
      res.send(response.rows);
      console.log('GET Languages success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in Languages GET');
    })
});

router.get(`/languages/${id}`, (req, res) => {
  const languageID = req.params.id;
  const queryText = `
  SELECT FROM "languages"
  WHERE "id" = $1
  ;`;

  pool.query(queryText, [languageID])
    .then(() => {
      res.send(response.rows);
      console.log('GET Language by id success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in GET Language by id');
    })
});

router.post('/languages', (req, res) => {
  const newLanguage = req.body.language;
  const queryText = `
  INSERT INTO "languages" (language, glottocode, description, endonym, global_speakers, sc_speakers, category_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  ;`;

  pool.query(queryText, [newLanguage.language, newLanguage.glottocode, newLanguage.description,
  newLanguage.endonym, newLanguage.global_speakers, newLanguage.sc_speakers, newLanguage.category_id])
    .then(() => {
      res.sendStatus(201);
      console.log('POST Language success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in Language POST');
    })

});

router.put(`/languages/${id}`, (req, res) => {
  const id = req.params.id;
  const updatedLanguage = req.body.language;
  const queryText = `
  UPDATE "languages"
  SET "language" = $2,
  "glottocode" = $3,
  "description" = $4,
  "global_speakers" = $5,
  "sc_speakers" = $6,
  "category_id" = $7
  WHERE "id" = $1
  ;`;

  pool.query(queryText, [id, updatedLanguage.language, updatedLanguage.glottocode, updatedLanguage.description,
    updatedLanguage.endonym, updatedLanguage.global_speakers, updatedLanguage.sc_speakers, updatedLanguage.category_id])
    .then(() => {
      res.sendStatus(200);
      console.log('PUT Language success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in Language PUT');
    })
});

router.delete(`/languages/${id}`, (req, res) => {
  const languageID = req.params.id;
  const queryText = `
  DELETE FROM "languages"
  WHERE "id" = $1
  ;`;

  pool.query(queryText, [languageID])
    .then(() => {
      res.send(response.rows);
      console.log('DELETE Language success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in DELETE Language');
    })
});



module.exports = router;