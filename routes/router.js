const express = require('express');
const router = express.Router();
const { upload, list, detail, deletemedia, update} = require('../controllers/media')
const { image } = require('../libs/multer');

router.post('/image/upload', image.single('image'), upload);
router.get('/image', list);
router.get('/image/:id', detail);
router.delete('/image/:id', deletemedia);
router.put('/image/:id', image.single('image'), update);

module.exports = router;