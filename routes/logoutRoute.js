var router = express.Router();

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});
module.exports = router;