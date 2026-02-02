const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisans');

// Associations

// Catégorie → Specialites
Categorie.hasMany(Specialite, { as: 'specialites', foreignKey: 'id_categorie' });
Specialite.belongsTo(Categorie, { as: 'categorie', foreignKey: 'id_categorie' });

// Specialite → Artisans
Specialite.hasMany(Artisan, { as: 'artisans', foreignKey: 'id_specialite' });
Artisan.belongsTo(Specialite, { as: 'specialite', foreignKey: 'id_specialite' });

module.exports = {
  Categorie,
  Specialite,
  Artisan
};
