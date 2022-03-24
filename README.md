# aws-uploader
Contains the front-end and back-end for a basic AWS uploading system

To run:
Make sure you have Node JS (https://nodejs.org/en/) and npm (https://www.npmjs.com/) installed.
Make sure that you have filled out the the following environment variables:
- ACCESS_KEY_ID: Access key for IAM user in AWS
- SECRET_ACCESS_KEY: Secret access key for IAM user in AWS
- BUCKET_NAME: Name of the bucket you wish to upload to
- SERVER_PORT: The port that the server is running on. Recommended 8080 (the front-end is already pointing to this in AxiosHelper.tsx)

Run npm start on both the front-end and back-end
