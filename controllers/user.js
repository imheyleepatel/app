var User = require('../models/user.model');
const bcrypt = require("bcrypt");

//for user reistration 
exports.user_registration = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, data) {
        if (err) {
            console.log("error with the query");
        }
        if (data) {
            res.send("user already exists");
        } else {
            addUser();
        }
    });

    //adding that user to the database
    function addUser() {
        var saltRounds = 10;
        var encrypted_password = bcrypt.hashSync(req.body.password, saltRounds);

        const user_obj = new User({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: encrypted_password
        });

        //after creating user object just save it to the database
        user_obj.save(function(err) {
            res.send(req.body.name + " has been added to the database");
        });
    }
};

//user login 
exports.user_login = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, data) {
        if (data) {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                res.send("Logged In");
            } else {
                res.send("Please enter correct password");
            }
        } else {
            res.send("There is no user with this email");
        }
    });
};
