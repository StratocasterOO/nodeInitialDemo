const express = require("express");

const uploadImage = require("../helpers/helper");

const routerUpload = express.Router();

/* routerUpload.use('/uploads', express.static(path.join(__dirname, '/uploads')));

routerUpload.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../helpers/upload.html'))
}) */

routerUpload.post('/', uploadImage.single('image'), (req, res, next) => {
  try {
      return res.status(201).json({
          message: 'File uploaded successfully'
      });
  } catch (error) {
      console.log(error);
  }
});

module.exports = routerUpload;