const { Router } = require('express'); 
const passport = require('passport');
const User = require('../database/schemas/User');
const { hashPassword , comparePassword } = require('../utils/helpers');
const router = Router(); 

router.post("/login", passport.authenticate("local"), (req, res) => {
    console.log(req.body.email + " Logged In");
    res.json({
        username: req.user.username,
        _id: req.user._id,
    });
});

router.post('/register', async (req, res) => { 
    const { email, password, username } = req.body; 
    const emailDB = await User.findOne({ email }); 

    if (emailDB) {
        console.log("email in use");
        return res.status(400).send({ msg: 'User already exists!' }); 
    } else { 
        const hashedPassword = hashPassword(password); 

        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        return res.status(201).send({ msg: 'User registered successfully' });
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
