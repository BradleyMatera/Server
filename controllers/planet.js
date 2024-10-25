// controllers/planet.js

const { Planet } = require('../models');
const path = require('path');

// Show all planets
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.render('planets/index', { planets });
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show form to create a new planet
const newPlanet = (req, res) => {
  res.render('planets/new');
};

// Create a new planet
const create = async (req, res) => {
  try {
    const { name } = req.body;
    let imagePath = null;

    if (req.file) {
      // Store imagePath without leading slash
      imagePath = `uploads/planets/${req.file.filename}`;
    }

    const planet = await Planet.create({ name, imagePath });
    res.redirect(`/planets/${planet.id}`);
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show a single planet
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      res.render('planets/show', { planet });
    } else {
      res.status(404).render('error', { error: 'Planet not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show form to edit a planet
const edit = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      res.render('planets/edit', { planet });
    } else {
      res.status(404).render('error', { error: 'Planet not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Update a planet
const update = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      const { name } = req.body;
      let imagePath = planet.imagePath; // Keep existing imagePath by default

      if (req.file) {
        // Update imagePath if a new image is uploaded
        imagePath = `uploads/planets/${req.file.filename}`;
      }

      await planet.update({ name, imagePath });
      res.redirect(`/planets/${planet.id}`);
    } else {
      res.status(404).render('error', { error: 'Planet not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Delete a planet
const remove = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.destroy();
      res.redirect('/planets');
    } else {
      res.status(404).render('error', { error: 'Planet not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

module.exports = {
  index,
  new: newPlanet,
  create,
  show,
  edit,
  update,
  remove,
};