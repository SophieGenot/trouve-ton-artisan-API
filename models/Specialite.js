// models/Specialite.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Specialite = sequelize.define('specialite', {
  id_specialite: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nom_specialite: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  id_categorie: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'specialite',
  timestamps: false
});

module.exports = Specialite;
