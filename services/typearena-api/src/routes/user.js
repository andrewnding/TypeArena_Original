import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/user', (req, res) => {
    if (!req.user) {
        const guest = req.context.userStore.createGuest();
        req.user = guest.toJSON();
    }

    return res.json(req.user);
});

router.post('/user', async (req, res, next) => {
    const {
        email,
        username,
        password
    } = req.body;

    try {
        const user = await req.context.userStore.createUser({ email, username, password });
        res.send(user);
    } catch (e) {
        next(e);
    }
});

router.get('/login', (req, res, next) => {
    res.send('login page')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect('/login');
        }

        req.login(user, next);
        res.redirect('/');
    })(req, res, next)
})

export default router;