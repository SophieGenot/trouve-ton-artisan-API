const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');
const Specialite = require('../models/Specialite');
const Artisans = require('../models/Artisans');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// GET toutes les catégories (public)
router.get('/simple', async (req, res) => {
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

// GET toutes les spécialités d'une catégorie
router.get('/:id/specialites', async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      where: { categorieId: req.params.id }
    });
    res.json(specialites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une catégorie
router.post('/', apiKeyAuth, async (req, res) => {
  const { nom_categorie } = req.body;

  if (!nom_categorie) {
    return res.status(400).json({ error: 'nom_categorie est obligatoire' });
  }

  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json(categorie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT modifier une catégorie
router.put('/:id', apiKeyAuth, async (req, res) => {
  const { nom_categorie } = req.body;

  if (!nom_categorie) {
    return res.status(400).json({ error: 'nom_categorie est obligatoire' });
  }

  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ error: 'Catégorie non trouvée' });

    await categorie.update(req.body);
    res.json(categorie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE supprimer une catégorie
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
