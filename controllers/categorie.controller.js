 const Categorie = require('../models/Categorie');
const Specialite = require('../models/Specialite');

// GET toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET toutes les spécialités d'une catégorie
exports.getSpecialitesByCategorie = async (req, res) => {
  try {
    const { id_categorie } = req.params;

    const specialites = await Specialite.findAll({
      where: { id_categorie }
    });

    res.json(specialites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// créer une catégorie
exports.createCategorie = async (req, res) => {
  const { nom_categorie } = req.body;
  if (!nom_categorie) {
    return res.status(400).json({ error: 'nom_categorie est obligatoire' });
  }

  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json(categorie);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// modifier une catégorie
exports.updateCategorie = async (req, res) => {
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
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ error: 'Catégorie non trouvée' });

    await categorie.destroy();
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
