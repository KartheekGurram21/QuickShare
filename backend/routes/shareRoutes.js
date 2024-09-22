const router = require('express').Router()
const { validateUrl } = require('../controllers/urlController')
const { uploadFile, upload, downloadFile, fileDetails } = require('../controllers/dataController')

router.get('/:endpoint', validateUrl)
router.post('/upload', upload, uploadFile)
router.get('/download/:id', downloadFile)
router.get('/meta/:id', fileDetails)

module.exports = router;