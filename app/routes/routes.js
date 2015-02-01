var express = require('express'),
    router  = express.Router(),
    applicationController = require('../controllers/application_controller'),
    pagesController       = require('../controllers/pages_controller'),
    usersController       = require('../controllers/users_controller');

router.get('/*', applicationController.index);
router.get('/', pagesController.index);

router.get('/sign_in', usersController.signIn);
router.get('/sign_up', usersController.signUp);
router.get('/forgot_password', usersController.forgotPassword);
router.get('/users', usersController.index);
router.get('/user/:username', usersController.show);
router.post('/users/sign_in', usersController.signInPost);
router.post('/users/sign_up', usersController.signUpPost);
router.post('/users/forgot_password', usersController.forgotPasswordPost);

module.exports = router;
