const express = require('express');
const router = express.Router();
const { Artisan, Specialite, Categorie } = require('../models');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// GET tous les artisans (liste)
router.get('/', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        as: 'specialite',
        include: { model: Categorie, as: 'categorie' }
      }
    });
    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST créer un artisan
router.post('/', apiKeyAuth, async (req, res) => {
  const { nom, id_specialite, note, ville, email } = req.body;
  if (!nom || !id_specialite || !note || !ville || !email) {
    return res.status(400).json({ error: 'Nom, spécialité, note, ville et email sont obligatoires' });
  }

  try {
    const newArtisan = await Artisan.create(req.body);
    res.status(201).json(newArtisan);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: {
        model: Specialite,
        as: 'specialite',
        include: { model: Categorie, as: 'categorie' }
      }
    });

    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// modifier un artisan
router.put('/:id', apiKeyAuth, async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });

    await artisan.update(req.body);
    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE supprimer un artisan
router.delete('/:id', apiKeyAuth, async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });

    await artisan.destroy();
    res.json({ message: 'Artisan supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
