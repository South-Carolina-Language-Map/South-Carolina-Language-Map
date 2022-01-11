const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

//GET ALL ADMINS
// Handles Ajax request for user information if user is authenticated
router.get('/admin', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//REGISTER
// Handles POST request with new user data
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" ("username", "password", "fullName", "email")
    VALUES ($1, $2, $3, $4) 
    RETURNING id;`;

  pool
    .query(queryText, [username, password, req.body.fullName, req.body.email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

//LOGIN
// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});


//LOGOUT
// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// GET ALL PENDING ADMINS and their info, save for passwords for obvious reasons.
router.get('/admin/pending', (req, res) => {

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {

    pool.query(`
  SELECT "id", "username", "fullName", "pending", "clearance_level", "email" FROM "user" WHERE "pending" = TRUE;
`)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.log('ERROR in Pending Admins GET', err);
      });

  } else {
    res.sendStatus(403);
  } //end if conditional
})

//ADMIN clearance_level set to 1 for approval
router.put('/admin/:id', rejectUnauthenticated, (req, res) => {
  //this is the id of user to approve
  const userToApprove = req.params.id;

  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {

    //query to update clearance_level
    let queryTextApproval = `
  UPDATE "user"
  SET "clearance_level" = 1, "pending" = FALSE
  WHERE "id" = $1;
  `;

    pool.query(queryTextApproval, [userToApprove])
      .then(respond => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.log('ERROR IN UPDATE', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  } //end if conditional

}) //end put 


//DELETE a user not approved for admin
router.delete('/admin/:id', rejectUnauthenticated, (req, res) => {
  //this is the id of user to approve
  const userToDelete = req.params.id;
  //security - for admin use only
  const clearanceLevel = req.user.clearance_level

  if (clearanceLevel >= 1) {

  //query to update clearance_level
  let queryTextUserToDelete = `
  DELETE FROM "user"
  WHERE "id" = $1
  `

  pool.query(queryTextUserToDelete, [userToDelete])
    .then(respond => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('ERROR IN DELETE', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  } //end if conditional

}) //end DELETE 

module.exports = router;
