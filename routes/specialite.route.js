const express = require('express');  
const router = express.Router();
const Specialite = require('../models/Specialite');
const Categorie = require('../models/Categorie');
const Artisan = require('../models/Artisans');
const apiKeyAuth = require('../middleware/apiKeyAuth');

router.get('/', async (req, res) => {
  console.log('Route /api/specialites/ appelée');
  try {
    const specialites = await Specialite.findAll();
    res.json(specialites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  console.log('Route /api/specialites/:id appelée', req.params.id);
  try {
    const specialite = await Specialite.findByPk(req.params.id, {
      include: [
        { model: Categorie, as: 'categorie' },
        { model: Artisan, as: 'artisans' }
      ]
    });

    if (!specialite) {
      return res.status(404).json({ error: 'Spécialité non trouvée' });
    }
    res.json(specialite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

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

router.delete('/:id', apiKeyAuth, async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id);
    if (!specialite) return res.status(404).json({ error: 'Spécialité non trouvée' });

    await specialite.destroy();
    res.json({ message: 'Spécialité supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
