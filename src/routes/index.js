const router = require('express').Router();
const Reponse = require('../utils/Response');
const installRoutes = require('./installRoutes');
const userRoutes = require('./userRoutes');
const wishRoutes = require('./wishRoutes');
const wishPublicRoutes = require('./wishPublicRoutes');
const { needInstall, isInstall } = require('../middleware/install');
const auth = require('../middleware/auth');

router.use('/install', isInstall, installRoutes);
router.use('/user', needInstall, userRoutes);
router.use('/wish', needInstall, auth, wishRoutes);
router.use('/public/wish', needInstall, wishPublicRoutes);
router.use(needInstall, (req, res) => {
  Reponse.notFound(res);
});




module.exports = router;
