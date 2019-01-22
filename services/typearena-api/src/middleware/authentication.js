import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (req, id, done) => {
    try {
        const user = await req.context.userStore.findOne({ id })
        done(null, user)
    } catch (e) {
        done(e, false)
    }
});


export const authenticationMiddleware = async (req, res, next) => {
    passport.use(new LocalStrategy(
        // Gets username and password from query params
        async (username, password, done) => {
            let user;
            let canAuthenticate;

            try {
                user = await req.context.userStore.findOne({ username });
            } catch (e) {
                return done(e, false)
            }

            try {
                canAuthenticate = await req.context.userStore.canAuthenticate({
                    username,
                    passwordAttempt: password
                });
            } catch (e) {
                return done(e, false);
            }

            if (!canAuthenticate) {
                return done(null, false);
            }

            return done(null, user);
        }
    ));

    next();
}
