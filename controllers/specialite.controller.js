const Specialite = require('../models/Specialite');
const Artisan = require('../models/Artisans');

module.exports = {
  // créer une spécialité
  create: async (req, res) => {
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
  },

  // modifier une spécialité
  update: async (req, res) => {
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
  },

  // supprimer une spécialité
  delete: async (req, res) => {
    try {
      const specialite = await Specialite.findByPk(req.params.id);
      if (!specialite) return res.status(404).json({ error: 'Spécialité non trouvée' });

      await specialite.destroy();
      res.json({ message: 'Spécialité supprimée' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET toutes les spécialités d'une catégorie avec leurs artisans
  getByCategorie: async (req, res) => {
    try {
      const idCategorie = req.params.id_categorie;
      const specialites = await Specialite.findAll({
        where: { id_categorie: idCategorie },
        attributes: ['id_specialite', 'nom_specialite'],
        include: {
          model: Artisan,
          as: 'artisans',
          attributes: ['id_artisan', 'nom', 'note', 'ville', 'photo']
        }
      });

      res.json(specialites);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
};
