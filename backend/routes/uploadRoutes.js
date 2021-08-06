import path from 'path'
import express from 'express'
import multer from 'multer'
import crypto from 'crypto'
import mongoose from 'mongoose'
import {GridFsStorage} from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import dotenv from 'dotenv'

dotenv.config({path: './config.env'})

// Mongo URI
const mongoURI = process.env.MONGO_URI;

// console.log(mongoURI)

// Create mongo connection
const conn = mongoose.createConnection(mongoURI,
  {useNewUrlParser: true, useUnifiedTopology: true});

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {

  // console.log(req.file);

  res.send(`/api/upload/image/${req.file.filename}`)
})

router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

export default router   