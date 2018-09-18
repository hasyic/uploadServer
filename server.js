var express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads' })
var cors = require('cors')
var sizeOf = require('image-size')

var delay = 100

var port = process.env.PORT || 9999

var app = express()

var localAddress = '0.0.0.0:' + port

app.use(cors())

app.use(express.static('uploads'))

app.options('upload', function (req, res) {
  res.status(204)
})

app.post('/upload', upload.single('file'), function (req, res, next) {
  console.info(req.file.originalname + ' is uploading...')
  sizeOf(req.file.path, function (err, size = {height: null, width: null}) {
    if (err) {
      console.error(err)
    }
    setTimeout(function () {
      res.status(200).json({
        code: 1,
        data: {
          images: localAddress + req.file.filename,
          width: size.width,
          height: size.height
        }
      })
    }, delay)
  })
}) 

app.listen(port, function () {
  console.log('upload server now listening on port: ', port)
})
