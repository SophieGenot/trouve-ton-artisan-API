const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config({ path:  './env/.env.dev'});
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const { Categorie, Specialite, Artisans } = require('./models');
// Routes Artisan
const artisanRoutes = require('./routes/artisan.route');
app.use('/api/artisans', artisanRoutes);

// Route Catégorie
const categorieRoutes = require('./routes/categorie.route');
app.use('/api/categories', categorieRoutes);

// Route Spécialité
const specialiteRoutes = require('./routes/specialite.route');
app.use('/api/specialites', specialiteRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
