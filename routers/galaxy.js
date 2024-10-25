// routers/galaxy.js

const express = require('express');
const galaxyCtlr = require('../controllers/galaxy');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', galaxyCtlr.index);
router.get('/new', galaxyCtlr.new);
router.post('/', upload('galaxies').single('image'), galaxyCtlr.create);
router.get('/:id', galaxyCtlr.show);
router.get('/:id/edit', galaxyCtlr.edit);
router.put('/:id', upload('galaxies').single('image'), galaxyCtlr.update);
router.delete('/:id', galaxyCtlr.remove);

module.exports = router;