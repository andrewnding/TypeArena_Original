import express from 'express';

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
        await req.context.userStore.createUser({ email, username, password });
        res.end();
    } catch (e) {
        next(e);
    }
});

router.post('/user/login', async (req, res, next) => {
    const {
        email,
        username,
        passwordAttempt
    } = req.body;

    try {
        const success = await req.context.userStore.canAuthenticate({ email, username, passwordAttempt });
        res.send(success);        
    } catch (e) {
        next(e);
    }
});

export default router;