const express = require('express');
const router = express.Router();
const apiKeyAuth = require('../middleware/apiKeyAuth');
const artisanController = require('../controllers/artisans.controller');

// Routes spécifiques fixes
router.get('/top', artisanController.getTopArtisans);
router.get('/search', artisanController.searchArtisan);
router.get('/categorie/:id_categorie', artisanController.getArtisansByCategorie);

router.get('/', artisanController.getAllArtisans);
router.get('/:id_artisan', artisanController.getArtisanById);
router.post('/', apiKeyAuth, artisanController.createArtisan);
router.put('/:id', apiKeyAuth, artisanController.updateArtisan);
router.delete('/:id', apiKeyAuth, artisanController.deleteArtisan);

module.exports = router;
