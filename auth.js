const db = require("./db/models");

const loginUser = (req, res, user) => {
    console.log(req.session);
    req.session.auth = {
        userId: user.id
    }
}

const restoreUser = async (req, res, next) => {
    if (req.session.auth) {
        const {userId } = req.session.auth;

        try {
            const user = await db.Profile.findByPk(userId);

            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }

        }catch(err) {
            res.locals.authenticated = false;
            next(err);
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
}


const logoutUser = (req, res) => {
    delete req.session.auth;
}

const requireAuth = (req, res, next) => {
    console.log(res)
    if (res.locals.authenticated) {
        res.redirect('/users/signup');
    } else {
        next();
    }
}

module.exports = {
    loginUser,
    restoreUser,
    logoutUser,
    requireAuth
}
