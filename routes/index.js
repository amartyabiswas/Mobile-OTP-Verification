let express = require('express');
let router = express.Router();
const User = require('../models/User');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/users/new', function (req, res) {
    res.render('signup.ejs', {
        title: 'Create User Account',
        // errors: req.flash('errors')
    });
});

router.post('/users', function (req, res) {
    const params = req.body;

    // Create a new user based on form parameters
    const user = new User({
        fullName: params.fullName,
        email: params.email,
        phone: params.phone,
        countryCode: '91',
        password: params.password
    });

    user.save(function(err, doc) {
        if (err) {
            // req.flash('errors', 'There was a problem creating your account - note that all fields are required. Please double-check your input and try again.');
            res.redirect('/users/new');
        } else {
            // If the user is created successfully, send them an account verification token
            user.sendAuthyToken(function(err) {
                if (err) {
                    // req.flash('errors', 'There was a problem sending your token - sorry :(');
                }
                // Send to token verification page
                res.redirect(`/users/${doc._id}/verify`);
            });
        }
    });
});

router.get('/users/:id/verify', function (req, res) {
    res.render('verify.ejs', {
        title: 'Verify Phone Number',
        // errors: req.flash('errors'),
        // successes: req.flash('successes'),
        id: req.params.id
    });
});

// Resend a code if it was not received
router.post('/users/:id/resend', function (request, response) {

    User.findById(request.params.id, function(err, user) {
        if (err || !user) {
            //console.log('User not found for this ID.');
            return die('User not found for this ID.');
        }
        // If we find the user, let's send them a new code
        user.sendAuthyToken(postSend);
    });

    // Handle send code response
    function postSend(err) {
        if (err) {
            //console.log('There was a problem sending you the code');
            return die('There was a problem sending you the code - please '
                + 'retry.');
        }

        //request.flash('successes', 'Code re-sent!');
        response.redirect('/users/'+request.params.id+'/verify');
    }

    // respond with an error
    function die(message) {
        // request.flash('errors', message);
        response.redirect('/users/'+request.params.id+'/verify');
    }
});

router.post('/users/:id/verify', function (request, response) {
    let user = {};

    User.findById(request.params.id, function(err, doc) {
        if (err || !doc) {
            return die('User not found for this ID.');
        }

        // If we find the user, let's validate the token they entered
        user = doc;
        user.verifyAuthyToken(request.body.code, postVerify);
    });

    // Handle verification response
    function postVerify(err) {
        if (err) {
            return die('The token you entered was invalid - please retry.');
        }

        // If the token was valid, flip the bit to validate the user account
        user.verified = true;
        user.save(postSave);
    }

    // after we save the user, handle sending a confirmation
    function postSave(err) {
        if (err) {
            return die('There was a problem validating your account please enter your token again.');
        }

        // Send confirmation text message
        const message = 'You did it! Signup complete :)';
        user.sendMessage(message, function() {
            // request.flash('successes', message);
            response.redirect(`/users/${user._id}`);
        }, function(err) {
            // request.flash('errors', 'You are signed up, but we could not send you a message. Our bad :(');
        });
    }
    // respond with an error
    function die(message) {
        // request.flash('errors', message);
        response.redirect('/users/'+request.params.id+'/verify');
    }
});

router.get('/users/:id', function (request, response, next) {
    User.findById(request.params.id, function(err, user) {
        if (err || !user) {
            return next();
        }
        response.render('main.ejs', {
            title: 'Hi there ' + user.fullName + '!',
            user: user
            // errors: request.flash('errors'),
            // successes: request.flash('successes')
        });
    });
});

module.exports = router;