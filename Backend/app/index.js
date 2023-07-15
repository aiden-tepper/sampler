const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

require("dotenv").config();

const app = express();
const port = process.env.BE_PORT || 3001;

app.use(cors());
app.options('*', cors())
app.use(express.json());

app.use(
  session({
    secret: "groovy gurus",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { DB_HOST, DB_PORT, DB_USER, DB_PASS } = process.env;

const pool = mysql.createPool({
  host: DB_HOST || "db",
  port: DB_PORT || 3000,
  user: DB_USER,
  password: DB_PASS,
  database: "master",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0
});

passport.use(
  new LocalStrategy((username, password, done) => {
    pool.query(
      "SELECT * FROM User WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return done(err);
        if (!results.length)
          return done(null, false, { message: "Incorrect username." });
        if (results[0].password !== password)
          return done(null, false, { message: "Incorrect password." });
        return done(null, results[0]);
      }
    );
  })
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

// handle user register
app.post("/register", (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    pool.query(
      "SELECT * FROM User WHERE username = ?",
      [username],
      (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          return res.json({ message: "Username already taken", status: 400 });
        }

        // Insert the new user into the database
        pool.query(
          "INSERT INTO User (username, password) VALUES (?, ?)",
          [username, password],
          (err, results) => {
            if (err) throw err;
            console.log(results);
            console.log("User registered");

            // Send a successful response
            res.json({ message: "Registration successful", status: 201 });
          }
        );
      }
    );
  } catch (err) {
    console.error(err.message);
    res.json({ message: "Server error", status: 500 });
  }
});

app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user, info, status) => {
    if (err) { return res.json({ message: 'Server error', status: 500 }) }
    if (!user) { return res.json({ message: 'Invalid credentials', status: 400 }) }
    res.json({ message: 'Login successful', status: 201 });
  })(req, res);
});

app.get("/sample", (req, res) => {
  try {
    pool.query('SELECT * FROM Sample', (err, results) => {
      if (err) throw err;
      res.json({ data: results, status: 200 });
    });
  } catch (err) {
    console.error(err.message);
    res.json({ message: 'Server error', status: 500 });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
