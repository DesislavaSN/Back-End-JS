
function hasUser () {
    return (req, res, next)  => {
        if (req.user != undefined) {
            next();
        } else {
            res.redirect('auth/login');
        }
    }
}

module.exports = {
    hasUser,
}