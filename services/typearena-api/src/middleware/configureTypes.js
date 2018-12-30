import User from 'types/user';

export const configureTypes = (req, res, next) => {
    req.context = {
        user: new User(res.locals.connection)
    }

    next();
}