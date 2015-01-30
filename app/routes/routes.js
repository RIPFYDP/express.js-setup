var express = require('express'),
    router  = express.Router(),
    pagesController = require('../controllers/pages_controller'),
    usersController = require('../controllers/users_controller');

router.get('/', pagesController.index);

router.get('/sign_in', usersController.signIn);
router.get('/sign_up', usersController.signUp);
router.get('/users', usersController.index);
router.post('/users/sign_in', usersController.signInPost);
router.post('/users/sign_up', usersController.signUpPost);
router.get('/user/:username', usersController.show);

module.exports = router;
