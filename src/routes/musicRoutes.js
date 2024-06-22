const express = require('express');
const musicController = require('../controllers/musicControllers');
const router = express.Router();

router.get('/', musicController.getAllMusic);
router.get('/:id', musicController.getMusicById);
router.post('/', musicController.createMusic);
router.put('/:id', musicController.updateMusic);
router.delete('/:id', musicController.deleteMusic);

module.exports = router;