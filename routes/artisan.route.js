const express = require('express');
const router = express.Router();
const Artisan = require('../models/Artisans');
const Specialite = require('../models/Specialite');
const apiKeyAuth = require('../middleware/apiKeyAuth');

// GET tous les artisans
router.get('/simple', async (req, res) => {
  try {
    const artisans = await Artisan.findAll();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET tous les artisans avec relations et filtres
router.get('/', async (req, res) => {
  try {
    const { specialite, categorie } = req.query;
 const include = {
      model: Specialite,
      as: 'specialite',
      include: {
        model: require('../models/Categorie'),
        as: 'categorie'
      }
    };

    if (specialite) {
      include.where = { id: specialite };
    }

    if (categorie) {
      include.include.where = { id: categorie };
    }

    const artisans = await Artisan.findAll({ include });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
   
// GET un artisan par ID
router.get('/:id', async (req, res) => {
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
  const { nom, id_specialite } = req.body;
  // Validation simple
  if (!nom || !id_specialite) {
    return res.status(400).json({ error: 'Nom et id_specialite sont obligatoires' });
  }
  try {
    const newArtisan = await Artisan.create(req.body);
    res.status(201).json(newArtisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT modifier un artisan
router.put('/:id', apiKeyAuth, async (req, res) => {
  const { nom, id_specialite } = req.body;
  // Validation simple
  if (!nom || !id_specialite) {
    return res.status(400).json({ error: 'Nom et id_specialite sont obligatoires' });
  }
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    await artisan.update(req.body);
    res.json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// supprimer un artisan (protégé)
router.delete('/:id', apiKeyAuth, async (req, res) => {
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
