const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const multer = require('multer');
fs = require('fs-extra');
app.use(bodyParser.urlencoded({extended: true}));




var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      if(file.mimetype === "application/json") {
        cb(null,true);
      } else {
        cb(new Error(`file type: ${file.mimetype} not allowed`));
      }

  }
});


app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');

});

// upload single file

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);

  }
    res.send(file)
 
});
//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error)
  }

  res.send(files);
 
});

app.listen(8080, () => {
  console.log(`I'm listening`)
});

