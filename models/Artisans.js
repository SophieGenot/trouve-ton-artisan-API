const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Artisan = sequelize.define('Artisan', {
  id_artisan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.FLOAT, allowNull: false },
  ville: { type: DataTypes.STRING, allowNull: false },
  a_propos: { type: DataTypes.TEXT },
  email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  site_web: { type: DataTypes.STRING, validate: { isUrl: true } },
  top: { type: DataTypes.BOOLEAN, defaultValue: false },
  id_specialite: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'Artisan',
  timestamps: false
});

module.exports = Artisan;
