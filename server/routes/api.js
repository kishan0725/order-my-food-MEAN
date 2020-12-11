const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Hotel = require('../models/hotel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('./verifyToken');
require('dotenv').config();

//connect to the database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch(err => console.log(err));

router.get('/', (req, res) => {
    res.send('Redirecting to login page');
});

router.post('/register', async(req, res) => {
    let userData = req.body;
    // check if the user is already in the database
    const emailExist = await User.findOne({email: userData.email});
    if (emailExist) return res.status(400).send("Email already exist!");

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    });

    // save to the db
    newUser.save()
        .then((registeredUser) => {
            let payload = { subject: registeredUser.id};
            let token = jwt.sign(payload, process.env.SECRET_KEY);
            res.status(200).send({token, username: registeredUser.username, email: registeredUser.email, userId: registeredUser.id});
        })
        .catch((error) => {console.log(error); res.status(400).send(error)});
    
});

router.post('/login', async(req, res) => {
    let userData = req.body;

    // check if the email matches the email in the database
    const user = await User.findOne({email: userData.email});
    if (!user) return res.status(400).send("Email doesn't exist!");

    // check if the password is correct
    const validPassword = await bcrypt.compare(userData.password, user.password);
    if(!validPassword) return res.status(400).send("Incorrect Password!");

    // create and assign a token
    let payload = { subject: user.id};
    let token = jwt.sign(payload, process.env.SECRET_KEY);
    return res.status(200).send({token, username: user.username, email: user.email, userId: user.id});
});

router.get('/hotels', verifyToken, async (req, res) => {
    try{
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch(err) {
        res.status(404).send(`Unable to process your request - ${err}`);
    }
});

router.get('/hotels/:hotelId', verifyToken, async (req, res) => {
    try{
        const hotel = await Hotel.findOne({id: req.params.hotelId});
        res.json(hotel);
    } catch(err) {
        res.status(404).send(`Unable to process your request - ${err}`);
    }
});

router.get('/order/:userId', verifyToken, async (req, res) => {

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User doesn't exist!");

    return res.status(200).send({orders: user.orders});
});

router.post('/order/:userId', verifyToken, async(req, res) => {

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("User doesn't exist!");

    User.updateOne(
        { _id: req.params.userId },
        { $push: {
            orders: req.body
            }
        },
        function(err, success) {
            if(err){
                return res.status(500).send(err)
            }
            else {
                return res.status(200).send(success);
            }
        }
    )
});

module.exports = router;