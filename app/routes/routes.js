var express = require('express'),
    router  = express.Router(),
    sessionHelper         = require('../helpers/session_helper'),
    applicationController = require('../controllers/application_controller'),
    pagesController       = require('../controllers/pages_controller'),
    settingsController    = require('../controllers/settings_controller'),
    usersController       = require('../controllers/users_controller');

router.get('/*', applicationController.index);
router.get('/', pagesController.index);

// users
router.get('/sign_in', usersController.signIn);
router.get('/sign_out', usersController.signOut);
router.get('/sign_up', usersController.signUp);
router.get('/forgot_password', usersController.forgotPassword);
router.get('/users', usersController.index);
router.get('/user/:username', usersController.show);
router.post('/users/sign_in', usersController.signInPost);
router.post('/users/sign_up', usersController.signUpPost);
router.post('/users/forgot_password', usersController.forgotPasswordPost);

// settings
router.get('/settings', sessionHelper.isAuthenticated, settingsController.profile);
router.get('/settings/profile', sessionHelper.isAuthenticated, settingsController.profile);
router.get('/settings/account', sessionHelper.isAuthenticated, settingsController.account);
router.get('/settings/preferences', sessionHelper.isAuthenticated, settingsController.preferences);
router.post('/settings/post_profile', sessionHelper.isAuthenticated, settingsController.postProfile);
router.post('/settings/post_account_password', sessionHelper.isAuthenticated, settingsController.postAccountPassword);
router.post('/settings/post_account_email', sessionHelper.isAuthenticated, settingsController.postAccountEmail);
router.post('/settings/post_account_deactivate', sessionHelper.isAuthenticated, settingsController.postAccountDeactivate);
router.post('/settings/post_account_email_preference', sessionHelper.isAuthenticated, settingsController.postAccountEmailPreference);

module.exports = router;
