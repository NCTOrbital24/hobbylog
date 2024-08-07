const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./strategies/local");

const authRoute = require("./routes/auth");
const hobbyRoute = require("./routes/hobby");
const goalRoute = require("./routes/goal");
const userRoute = require("./routes/user");
const friendRoute = require("./routes/friend");
const profileRoute = require("./routes/userProfile"); 
const searchRoute = require("./routes/search");
const imageRoute = require("./routes/image");

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

//register routes
app.use("/api/auth", authRoute);
app.use("/api/hobby", hobbyRoute);
app.use("/api/goal", goalRoute);
app.use("/api/user", userRoute);
app.use("/api/friend", friendRoute);
app.use('/api/profile', profileRoute);
app.use('/api/search', searchRoute);
app.use('/api/image', imageRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
