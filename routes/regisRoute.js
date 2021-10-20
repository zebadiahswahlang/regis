var express = require('express');
var router = express.Router();
var db = require('../regisdb');

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    inputData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
        confirmpassword: req.body.confirm_password
    }
    var sql = 'SELECT * FROM regis WHERE email =?';
    db.query(sql, [inputData.email], function(err, data, fields) {
        if (err)
            throw err
        if (data.length > 1)
            var msg = inputData.email + " already exist";
        else if (inputData.confirmpassword != inputData.password)
            var msg = "Passwords does not match";
        else {
            var sql = 'INSERT INTO regis SET ?';
            db.query(sql, inputData, function(err, data) {
                if (err)
                    throw err;
            });
            var msg = "Your are successfully registered";
        }
        res.render('register', { alertMsg: msg });
    })
});
module.exports = router;