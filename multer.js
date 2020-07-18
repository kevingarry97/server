const multer = require('multer')

// Storage Enginee
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// File Validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') return cb(null, true)

    cb({ message: 'Unsupported File format' }, false)
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fieldSize: 10024 * 10024 } })

module.exports = upload;

