const { Router } = require('express'); 
const passport = require('passport');
const User = require('../database/Schemas/User');
const { hashPassword , comparePassword } = require('../utils/helpers');
const router = Router(); 

router.post('/login', passport.authenticate('local'), (req, res) => { 
    console.log(req.body.email + ' Logged In'); 
    res.sendStatus(200);
}); 

router.post('/register', async(request, response) => { 
    const {email} = request.body; 
    const emailDB = await User.findOne({ email }); 

    if (emailDB) { 
        console.log("email in use");
        response.status(400).send( { msg: 'User already exists!'}); 
    } else { 
        const password = hashPassword(request.body.password); 
        console.log(password); 

        const username = request.body.username;

        const newUser = User.create({ username, password, email });
        response.send(201);
    }
}); 
module.exports = router; //export router