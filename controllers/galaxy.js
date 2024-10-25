// controllers/galaxy.js

const { Galaxy } = require('../models');
const path = require('path');

// Show all galaxies
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.render('galaxies/index', { galaxies });
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show form to create a new galaxy
const newGalaxy = (req, res) => {
  res.render('galaxies/new');
};

// Create a new galaxy
const create = async (req, res) => {
  try {
    const { name } = req.body;
    let imagePath = null;

    if (req.file) {
      imagePath = `uploads/galaxies/${req.file.filename}`;
    }

    const galaxy = await Galaxy.create({ name, imagePath });
    res.redirect(`/galaxies/${galaxy.id}`);
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show a single galaxy
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      res.render('galaxies/show', { galaxy });
    } else {
      res.status(404).render('error', { error: 'Galaxy not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show form to edit a galaxy
const edit = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      res.render('galaxies/edit', { galaxy });
    } else {
      res.status(404).render('error', { error: 'Galaxy not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Update a galaxy
const update = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      const { name } = req.body;
      let imagePath = galaxy.imagePath;

      if (req.file) {
        imagePath = `uploads/galaxies/${req.file.filename}`;
      }

      await galaxy.update({ name, imagePath });
      res.redirect(`/galaxies/${galaxy.id}`);
    } else {
      res.status(404).render('error', { error: 'Galaxy not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Delete a galaxy
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      await galaxy.destroy();
      res.redirect('/galaxies');
    } else {
      res.status(404).render('error', { error: 'Galaxy not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

module.exports = {
  index,
  new: newGalaxy,
  create,
  show,
  edit,
  update,
  remove,
};