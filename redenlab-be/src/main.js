const express = require('express');
const fs = require('fs')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const S3BucketManager = require('../src/s3bucketmanager')
const cors = require('cors')
const http = require("http");
require('dotenv').config()

const app = express();
const httpPort = process.env.SERVER_PORT
const bucketName = process.env.BUCKET_NAME

S3BucketManager().initBucketManager()

app.use(cors({ origin: '*'} ))

app.get('/', (req, res) => {
    res.status(200)
})

app.get('/listObjects', async (req, res) => {
    const result = await S3BucketManager().listObjects(bucketName)
    res.status(200).send(result)
})

app.post('/uploadFile', upload.single('new_file'), async (req, res) => {
    const { file } = req

    if(!file) {
        res.status(401).send('No file was received by the server to upload.')
        return
    }

    const data = fs.readFileSync(file.path)
    await S3BucketManager().pushObject(bucketName, `${file.originalname}`, data, 'text')
    fs.unlinkSync(file.path)
    res.status(200).send('File was uploaded successfully')
})

const httpServer = http.createServer(app)
httpServer.listen(httpPort)
console.log(`Listening on port ${httpPort}`)