var express = require('express')
var multer = require('multer')
var cors = require('cors')
var sizeOf = require('image-size')

var delay = process.env.DELAY || 100

var port = process.env.PORT || 8888

var app = express()

var destPath = 'uploaded'

var upload = multer({ dest: destPath })

app.use(cors())

app.use('/uploaded', express.static(destPath))

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
          name: req.file.originalname,
          images: '/' + destPath + '/' + req.file.filename,
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
