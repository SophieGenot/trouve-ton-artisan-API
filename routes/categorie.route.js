const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// GET toutes les catégories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET une catégorie par id (public)
router.get('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une catégorie (protégé)
router.post('/', apiKeyAuth, async (req, res) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json(categorie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT modifier une catégorie (protégé)
router.put('/:id', apiKeyAuth, async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    await categorie.update(req.body);
    res.json(categorie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE supprimer une catégorie (protégé)
router.delete('/:id', apiKeyAuth, async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    await categorie.destroy();
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
