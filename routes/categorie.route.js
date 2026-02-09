const express = require('express');
const router = express.Router();
const apiKeyAuth = require('../middleware/apiKeyAuth');
const categorieController = require('../controllers/categorie.controller');

// Routes CRUD
router.get('/', categorieController.getAllCategories);
router.get('/:id/specialites', categorieController.getSpecialitesByCategorie);
router.post('/', apiKeyAuth, categorieController.createCategorie);
router.put('/:id', apiKeyAuth, categorieController.updateCategorie);
router.delete('/:id', apiKeyAuth, categorieController.deleteCategorie);

module.exports = router;
