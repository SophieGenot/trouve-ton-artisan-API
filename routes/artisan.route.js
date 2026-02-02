const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisans');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// GET tous les artisans
router.get('/', async (req, res) => {
    console.log('GET /api/artisans reçu');
  try {
    const artisans = await Artisan.findAll();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET un artisan par ID
router.get('/:id', async (req, res) => {
    console.log('GET /api/artisans reçu');
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST créer un artisan
router.post('/', apiKeyAuth, async (req, res) => {
    console.log('POST /api/artisans reçu');
  try {
    const newArtisan = await Artisan.create(req.body);
    res.status(201).json(newArtisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT modifier un artisan
router.put('/:id', apiKeyAuth, async (req, res) => {
    console.log('PUT /api/artisans/:id reçu');
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    await artisan.update(req.body);
    res.json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE supprimer un artisan
router.delete('/:id', apiKeyAuth, async (req, res) => {
    console.log('DELETE /api/artisans/:id reçu');
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    await artisan.destroy();
    res.json({ message: 'Artisan supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
