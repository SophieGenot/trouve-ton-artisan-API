const express = require('express'); 
const router = express.Router();
const Specialite = require('../models/Specialite');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// Lister toutes les spécialités (public)
router.get('/simple', async (req, res) => {
  try {
    const specialites = await Specialite.findAll();
    res.json(specialites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET une spécialité par ID (public)
router.get('/:id', async (req, res) => {
  try {
    const specialite = await Specialite.findByPk({
      where: { id_specialite: req.params.id }
    });
    if (!specialite) {
      return res.status(404).json({ error: 'Spécialité non trouvée' });
    }
    res.json(specialite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer une spécialité
router.post('/', apiKeyAuth, async (req, res) => {
  const { nom_specialite, id_categorie } = req.body;

  if (!nom_specialite || !id_categorie) {
    return res.status(400).json({ error: 'nom_specialite et id_categorie sont obligatoires' });
  }

  try {
    const specialite = await Specialite.create(req.body);
    res.status(201).json(specialite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT modifier une spécialité
router.put('/:id', apiKeyAuth, async (req, res) => {
  const { nom_specialite, id_categorie } = req.body;

  if (!nom_specialite || !id_categorie) {
    return res.status(400).json({ error: 'nom_specialite et id_categorie sont obligatoires' });
  }

  try {
    const specialite = await Specialite.findByPk(req.params.id);
    if (!specialite) return res.status(404).json({ error: 'Spécialité non trouvée' });

    await specialite.update(req.body);
    res.json(specialite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer une spécialité (protégé)
router.delete('/:id', apiKeyAuth, async (req, res) => {
  try {
    const specialite = await Specialite.findByPk({
      where: { id_specialite: req.params.id }
    });
    if (!specialite) {
      return res.status(404).json({ error: 'Spécialité non trouvée' });
    }
    await specialite.destroy();
    res.json({ message: 'Spécialité supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
