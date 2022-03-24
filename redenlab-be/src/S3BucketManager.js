const AWS = require("aws-sdk");

function S3BucketManager() {
    function initBucketManager() {
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        });
    }

    async function pushObject(bucketName, filename, content, contentType) {
        const s3 = new AWS.S3()
        const params = {
            Bucket: bucketName,
            Key: filename,
            Body: content,
            ContentEncoding: 'base64',
            ContentType: contentType
        }

        const prom = s3.putObject(params).promise();
        prom.then(function (data, error) {
            if (error)
                console.error(error)
            else
                console.info('Uploaded object')
        })
    }

    async function listObjects(bucketName, objects = []) {
        const s3 = new AWS.S3()
        const response = await s3.listObjectsV2({ Bucket: bucketName}).promise();

        response.Contents.forEach(obj => objects.push(obj));

        return objects;
    }

    return {
        initBucketManager,
        pushObject,
        listObjects
    }
}

module.exports = S3BucketManager