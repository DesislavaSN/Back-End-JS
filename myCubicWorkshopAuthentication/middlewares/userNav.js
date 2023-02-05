module.exports = () => (req, res, next) => {
    if (req.user != undefined) {
        res.locals.hasUser = true;
        res.locals.username = req.user.username;
    }

    // console.log('userNav.js:',req.user._id);
    // console.log('USERNAME:', req.user.username);

    next();
}