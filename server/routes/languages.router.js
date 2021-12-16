const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET all languages
router.get('/', (req, res) => {
  pool.query(`SELECT * FROM "languages";`)
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
router.post('/', (req, res) => {
    const newLanguage = req.body;
    const examples = req.body.examples

    //query to create new language
    const queryText = `
    INSERT INTO "languages" (language, glottocode, description, endonym, global_speakers, sc_speakers, category_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING "id";
    `;
    pool.query(queryText, [newLanguage.language, newLanguage.glottocode, newLanguage.description,
    newLanguage.endonym, newLanguage.global_speakers, newLanguage.sc_speakers, newLanguage.category_id])
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
                insertExamplesQuery += `, ($1, $${(i + 1) * 2}, $${(i + 1) *2 + 1})`
            }

            //create new array to push examples into
            newExampleArray = []
            //loop
            for (let example of examples){
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
                .catch( error => {
                    console.log('SECOND QUERY FOR POST', error);
                    res.sendStatus(500);
                }) //end second query

            res.sendStatus(201);
            console.log('POST New Language success');
        })
        .catch((err) => {
            res.sendStatus(500);
            console.log('ERROR in Language POST first query', err);
        })
}); //end POST

//PUT - edit a language
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedLanguage = req.body;
  const queryText = `
  UPDATE "languages"
  SET "language" = $2,
  "glottocode" = $3,
  "description" = $4,
  "endonym" = $5,
  "global_speakers" = $6,
  "sc_speakers" = $7,
  "category_id" = $8
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
      console.log('ERROR in Language PUT', err);
    })
});


//DELETE a language
router.delete('/:id', (req, res) => {
  const languageID = req.params.id;
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
}); 



module.exports = router;