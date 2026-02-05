const express = require('express');
const router = express.Router();
const { Artisan, Specialite, Categorie } = require('../models');
const apiKeyAuth = require('../middleware/apiKeyAuth');
const { Op } = require("sequelize");

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

// GET artisans pour les cartes "vedette"
router.get('/top', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true }, // uniquement les artisans "top"
      attributes: ['id_artisan', 'nom', 'note', 'ville',], // champs nécessaires pour la carte
      include: {
        model: Specialite,
        as: 'specialite',
        attributes: ['nom_specialite']
      }
    });

    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/categorie/:id_categorie', async (req, res) => {
  try {
    const idCategorie = req.params.id_categorie;

    const artisans = await Artisan.findAll({
      include: {
        model: Specialite,
        as: 'specialite',
        where: { id_categorie: idCategorie },
        include: { model: Categorie, as: 'categorie' }
      },
      distinct: true,  
      group: ['Artisan.id_artisan'],
      order: [['nom', 'ASC']]       
    });

    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { nom } = req.query;

    const artisan = await Artisan.findOne({
      where: {
        nom: { [Op.like]: `%${nom}%` }
      },
      include: {
        model: Specialite,
        as: "specialite",
        include: { model: Categorie, as: "categorie" }
      }
    });

    if (!artisan) return res.status(404).json({ error: "Artisan non trouvé" });

    res.json(artisan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id_artisan', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id_artisan, {
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
