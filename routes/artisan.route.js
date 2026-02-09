const express = require('express');
const router = express.Router();
const apiKeyAuth = require('../middleware/apiKeyAuth');
const artisanController = require('../controllers/artisanController');


router.get('/', artisanController.getAllArtisans);
router.get('/:id_artisan', artisanController.getArtisanById);
router.post('/', apiKeyAuth, artisanController.createArtisan);
router.put('/:id', apiKeyAuth, artisanController.updateArtisan);
router.delete('/:id', apiKeyAuth, artisanController.deleteArtisan);

// Routes spécifiques
router.get('/top', artisanController.getTopArtisans);
router.get('/categorie/:id_categorie', artisanController.getArtisansByCategorie);
router.get('/search', artisanController.searchArtisan);

module.exports = router;
