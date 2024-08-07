const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");
const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log(req.body.email + " Logged In");
    res.json({
        username: req.user.username,
        id: req.user._id,
    });
});

router.post("/register", async (request, response) => {
    const { email } = request.body;
    const emailDB = await User.findOne({ email });

    if (emailDB) {
        response.status(400).send({ msg: "User already exists!" });
    } else {
        const password = hashPassword(request.body.password);

        const username = request.body.username;

        const newUser = User.create({ username, password, email });

        response.sendStatus(201);
    }
});

router.get("/status", (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Logged in as ${req.user.email}`);
    } else {
        res.send("Not logged in");
    }
});

module.exports = router; //export router
