import UserStore from 'stores/userStore';

export const configureTypes = (req, res, next) => {
    req.context = {
        userStore: new UserStore(res.locals.connection)
    }

    next();
}