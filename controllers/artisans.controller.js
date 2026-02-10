const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require("sequelize");

// GET tous les artisans (liste)
exports.getAllArtisans = async (req, res) => {
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
};

// GET artisan par ID
exports.getArtisanById = async (req, res) => {
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
};

// créer un artisan
exports.createArtisan = async (req, res) => {
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
};

// modifier un artisan
exports.updateArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id_artisan);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });

    await artisan.update(req.body);
    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// supprimer un artisan
exports.deleteArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id_artisan);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });

    await artisan.destroy();
    res.json({ message: 'Artisan supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// artisans vedettes HOME
exports.getTopArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      attributes: ['id_artisan', 'nom', 'note', 'ville'],
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
};

// GET artisans par catégorie
exports.getArtisansByCategorie = async (req, res) => {
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
      group: ['artisan.id_artisan'],
      order: [['nom', 'ASC']]
    });

    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Recherche artisan par nom
exports.searchArtisan = async (req, res) => {
  try {
    const { nom } = req.query;

    if (!nom) {
      return res.status(400).json({ error: 'Paramètre "nom" manquant' });
    }

    const artisan = await Artisan.findOne({
      where: {
        nom: { [Op.like]: `%${nom}%` }
      },
      include: {
        model: Specialite,
        as: 'specialite',
        include: { model: Categorie, as: 'categorie' }
      },
      order: [['nom', 'ASC']]
    });

    if (!artisan) {
      return res.status(404).json({ error: 'Aucun artisan trouvé' });
    }

    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


