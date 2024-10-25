// routers/planet.js

const express = require('express');
const planetCtlr = require('../controllers/planet');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', planetCtlr.index);
router.get('/new', planetCtlr.new);
router.post('/', upload('planets').single('image'), planetCtlr.create);
router.get('/:id', planetCtlr.show);
router.get('/:id/edit', planetCtlr.edit);
router.put('/:id', upload('planets').single('image'), planetCtlr.update);
router.delete('/:id', planetCtlr.remove);

module.exports = router;