// controllers/star.js

const { Star } = require('../models');
const path = require('path');

// Show all stars
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.render('stars/index', { stars });
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show form to create a new star
const newStar = (req, res) => {
  res.render('stars/new');
};

// Create a new star
const create = async (req, res) => {
  try {
    const { name } = req.body;
    let imagePath = null;

    if (req.file) {
      imagePath = `uploads/stars/${req.file.filename}`;
    }

    const star = await Star.create({ name, imagePath });
    res.redirect(`/stars/${star.id}`);
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show a single star
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      res.render('stars/show', { star });
    } else {
      res.status(404).render('error', { error: 'Star not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Show form to edit a star
const edit = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      res.render('stars/edit', { star });
    } else {
      res.status(404).render('error', { error: 'Star not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Update a star
const update = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      const { name } = req.body;
      let imagePath = star.imagePath;

      if (req.file) {
        imagePath = `uploads/stars/${req.file.filename}`;
      }

      await star.update({ name, imagePath });
      res.redirect(`/stars/${star.id}`);
    } else {
      res.status(404).render('error', { error: 'Star not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

// Delete a star
const remove = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.destroy();
      res.redirect('/stars');
    } else {
      res.status(404).render('error', { error: 'Star not found' });
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
};

module.exports = {
  index,
  new: newStar,
  create,
  show,
  edit,
  update,
  remove,
};