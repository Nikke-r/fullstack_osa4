const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

userRouter.post('/', async (req, res) => {
    const body = req.body;

    if (body.password === undefined || body.password.length < 3) {
        return res.status(400).json({ message: 'Password must be at least three characters long!' });
    }

    const rounds = 10;
    const passwordHash = await bcrypt.hash(body.password, rounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();
    res.json(savedUser);
});

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs');
    
    res.json(users.map(user => user.toJSON()));
});

module.exports = userRouter;