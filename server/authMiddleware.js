const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
const db = require('../db')
const User = require('../db/models/user');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const dbStore = new SequelizeStore({ db: db })
dbStore.sync();

router.use(session({
  secret: process.env.SESSION_SECRET || 'put a better secret here',
  store: dbStore,
  resave: false,
  saveUninitialized: false,
 }));

 router.use(passport.initialize());
 router.use(passport.session());

 passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

 module.exports = router;
