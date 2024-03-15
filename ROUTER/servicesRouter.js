const express = require('express');
const servicesController = require('../CONTROLLER/servicesController');
const authController = require('../CONTROLLER/authController');
const app = express();
const router = express.Router();

router.delete('/deleteService', servicesController.deleteMe);
router.use(authController.isLoggedIn);
router.route('/addService').get(servicesController.getAddService);
router.route('/createService').post(servicesController.createService);
router.get('/:slug', servicesController.service);

// router.route('/getCandidate').get(servicesController.getCandidatePage);
// router.route('/candis').get(servicesController.getCandidates);

module.exports = router;
