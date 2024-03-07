const express = require('express');
const router = express.Router();
const authController = require('.././CONTROLLER/authController');
const viewController = require('.././CONTROLLER/viewsController');

router.get('/', viewController.getIndexPage);
router.get('/admin', viewController.getAdminLogin);
router.post('/login', authController.login);
router.get('/contact', viewController.getContact);
router.post('/saveContact', viewController.saveContact);
router.delete('/deleteUser', viewController.deleteMe);

router.use(authController.isLoggedIn);
router.post('/logout', authController.logout);
router.post('/signup', viewController.createAccount);
router.get('/createAccount', viewController.getCreateAccount);
router.get('/dashboard', viewController.getDashboard);
router.get('/getContact', viewController.getContactDisplay);
router.get('/getUsers', viewController.getUsersDisplay);
router.get('/getServices', viewController.getServicesDisplay);

// router.get('/', authController.isLoggedIn, viewController.getIndexPage);
// router.get('/sessionOut', viewController.getSessionOut);
// router.get('/cards', viewController.getCard);
// router.get('/scanner', viewController.getScanner);

module.exports = router;
