// routers/star.js

const express = require('express');
const starCtlr = require('../controllers/star');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', starCtlr.index);
router.get('/new', starCtlr.new);
router.post('/', upload('stars').single('image'), starCtlr.create);
router.get('/:id', starCtlr.show);
router.get('/:id/edit', starCtlr.edit);
router.put('/:id', upload('stars').single('image'), starCtlr.update);
router.delete('/:id', starCtlr.remove);

module.exports = router;