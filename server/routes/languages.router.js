const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


//GET all languages
router.get('/', (req, res) => {

  //get everything except "examples".id so it doesn't overwrite "languages".id
  const queryText = `
  SELECT "languages".id, "languages".category_id, 
  "languages".description, "languages".endonym, "languages".global_speakers, 
  "languages".glottocode, "languages"."language", "languages".sc_speakers, 
  "languages".status, "examples".language_id, "examples".hyperlink, "examples".link_text 
  FROM "languages"
  LEFT JOIN "examples" 
  ON "languages".id = "examples".language_id 
  ORDER BY "languages"."language" ASC;
  `
  pool.query(queryText)
    .then((response) => {
      res.send(response.rows);
      console.log('GET Languages success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in Languages GET', err);
    })
});


//GET a specific language
router.get('/:id', (req, res) => {
  const languageID = req.params.id;
  const queryText = `
  SELECT * FROM "languages"
  WHERE "id" = $1
  ;`;

  pool.query(queryText, [languageID])
    .then((result) => {
      res.send(result.rows);
      console.log('GET Language by id success');
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log('ERROR in GET Language by id');
    })
});


//POST new language(1st query) and its examples (2nd query)
router.post('/', rejectUnauthenticated, (req, res) => {
  const newLanguage = req.body;
  const examples = req.body.examples

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {
    //query to create new language
    const queryText = `
    INSERT INTO "languages" (language, glottocode, description, endonym, global_speakers, sc_speakers, category_id, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING "id";
    `;
    pool.query(queryText, [newLanguage.language, newLanguage.glottocode, newLanguage.description,
    newLanguage.endonym, newLanguage.global_speakers, newLanguage.sc_speakers, newLanguage.category_id, newLanguage.status])
      .then((result) => {
        console.log('New language id:', result.rows[0].id);

        //new language ID
        const newLangId = result.rows[0].id;

        //second query to add examples into the example table
        let insertExamplesQuery = `
            INSERT INTO "examples" (language_id, link_text, hyperlink)
            VALUES ($1, $2, $3)
            `
        //loop for added examples
        for (let i = 1; i < req.body.examples.length; i++) {
          insertExamplesQuery += `, ($1, $${(i + 1) * 2}, $${(i + 1) * 2 + 1})`
        }

        //create new array to push examples into
        newExampleArray = []
        //loop
        for (let example of examples) {
          //push into new array
          newExampleArray.push(example.link_text)
          newExampleArray.push(example.hyperlink)
        }
        //call every other in pool.query

        console.log('This is newExampleArray', newExampleArray)
        pool.query(insertExamplesQuery, [newLangId, ...newExampleArray])
          .then(result => {
            res.sendStatus(201)
          })
          .catch(error => {
            console.log('SECOND QUERY FOR POST', error);
            res.sendStatus(500);
          }) //end second query
        console.log('POST New Language success');
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log('ERROR in Language POST first query', err);
      })
  } else {
    //forbidden
    res.sendStatus(403);
  } //end if conditional

}); //end POST

//PUT - edit a language
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const updatedLanguage = req.body;

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {

    const queryText = `
  UPDATE "languages"
  SET "language" = $2,
  "glottocode" = $3,
  "description" = $4,
  "endonym" = $5,
  "global_speakers" = $6,
  "sc_speakers" = $7,
  "category_id" = $8,
  "status" = $9
  WHERE "id" = $1
  ;`;

    pool.query(queryText, [id, updatedLanguage.language, updatedLanguage.glottocode, updatedLanguage.description,
      updatedLanguage.endonym, updatedLanguage.global_speakers, updatedLanguage.sc_speakers, updatedLanguage.category_id, updatedLanguage.status])
      .then(() => {

    let examplesQueryText= `
    UPDATE "examples"
    SET "link_text" = $2,
    "hyperlink" = $3
    WHERE "id" = $1
    `    

    pool.query(examplesQueryText, [updatedLanguage.language_id, updatedLanguage.link_text, updatedLanguage.hyper_link])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(500);
          console.log('ERROR in Language PUT', err);
        })//end second query

        
        console.log('PUT Language success');
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log('ERROR in Language PUT', err);
      })

  } else {
    //forbidden
    res.sendStatus(403);
  } //end if conditional

});


//DELETE a language
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const languageID = req.params.id;

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {

    const queryText = `
  DELETE FROM "languages"
  WHERE "id" = $1
  ;`;

    pool.query(queryText, [languageID])
      .then(() => {
        res.sendStatus(204);
        console.log('DELETE Language success');
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log('ERROR in DELETE Language', err);
      })
  } else {
    //forbidden
    res.sendStatus(403);
  } //end if conditional

});



module.exports = router;