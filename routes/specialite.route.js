const express = require('express');
const router = express.Router();
const specialiteController = require('../controllers/specialite.controller');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// Routes CRUD
router.post('/', apiKeyAuth, specialiteController.create);
router.put('/:id', apiKeyAuth, specialiteController.update);
router.delete('/:id', apiKeyAuth, specialiteController.delete);

// Route spécifique
router.get('/categorie/:id_categorie', specialiteController.getByCategorie);

module.exports = router;
