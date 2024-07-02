const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const fs = require('fs');
require("./strategies/local");

const authRoute = require("./routes/auth");
const userProfileRoute = require("./routes/userProfile");
const hobbyRoute = require("./routes/hobby");

require("./database");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: "AHVSHJAVSDHGASCDAHGVSD",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/express",
        }),
    })
);
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get("", (req, res) => {
    console.log("pong!");
    res.sendStatus(200);
});


app.use('/uploads', express.static('uploads'));


app.use("/api/auth", authRoute);
app.use("/api/profile", userProfileRoute);
app.use("/api/hobby", hobbyRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
