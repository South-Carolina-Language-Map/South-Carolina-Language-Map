const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const mapRouter = require('./routes/map.router');
const userRouter = require('./routes/user.router');
const sitesRouter = require('./routes/sites.router');
const regionsRouter = require('./routes/regions.router');
const languagesRouter = require('./routes/languages.router');
const categoriesRouter = require('./routes/categories.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/map', mapRouter);
app.use('/api/user', userRouter);
app.use('/api/sites', sitesRouter);
app.use('/api/regions', regionsRouter);
app.use('/api/languages', languagesRouter);
app.use('/api/categories', categoriesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
