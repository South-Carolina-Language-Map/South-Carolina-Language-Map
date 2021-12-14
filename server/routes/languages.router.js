const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



//POST new language(1st query) and its examples (2nd query)
router.post('/languages', (req, res) => {
    const newLanguage = req.body;

    //query to create new language
    const queryText = `
    INSERT INTO "languages" (language, glottocode, description, endonym, global_speakers, sc_speakers, category_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING "id";
    `;
    pool.query(queryText, [newLanguage.language, newLanguage.glottocode, newLanguage.description,
    newLanguage.endonym, newLanguage.global_speakers, newLanguage.sc_speakers, newLanguage.category_id])
        .then((result) => {
            console.log('New language id:', result.row[0].id);

            //new language ID
            const newLangId = result.row[0].id;

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
            for (example of examples){
            //push into new array
            newExampleArray.push(...example)
            }
            //call every other in pool.query
            
            pool.query(insertExamplesQuery, [newLangId, ...req.body.examples.link_text, ...req.body.examples.hyperlink])
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

module.exports = router;