const express = require('express');
const router = express.Router();

let users = [
    {
        name: "Jason",
        password: "1234"
    },
    {
        name: "Bob",
        password: "1432"
    }
];

const authenticated = (req, res, next) => {
    const password = req.headers.authorization;

    const user = users.find(e => e.password === password);

    if (!user) {
        return next(new Error("No user found"));
    }

    req.user = user;

    next();
}

router.get('/', (req, res) => {
    res.json({ users });
});

router.get('/me', authenticated, (req, res) => {
    res.json({ user: req.user });
});

router.post('/', (req, res) => {
    if (!req.body.name || !req.body.password)
        throw new Error("Name or password missing");

    users.push({ name: req.body.name, password: req.body.password });

    res.sendStatus(201);
});

router.get('/:name', (req, res) => {
    const user = users.find(e => e.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase());

    if (!user) throw new Error("User not found");

    res.json({ user });
});

router.get('/:name/profile', (req, res) => {
    const user = users.find(e => e.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase());

    if (!user) throw new Error("User not found");

    res.render('profile', { name: user.name });
});

module.exports = router