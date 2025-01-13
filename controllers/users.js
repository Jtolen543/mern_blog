const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require("../models/user");

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    return response.status(201).json(users)
})

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body;
    if (!password || password.length < 3) {
        return response.status(400).json({error: 'password must be at least 3 characters long'})
    }
    if (!username || username.length < 3) {
        return response.status(400).json({error: 'username must be at least 3 characters long'})
    }
    let user = await User.find({username})
    console.log(user)
    if (user.length !== 0) {
        return response.status(400).json({error: 'username must be unique'})
    }  
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    user = new User({
        username,
        name,
        password: passwordHash
    })
    // await username.save();
    response.status(201).json(user);
});

module.exports = userRouter
