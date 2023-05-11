const { S3Client} = require("@aws-sdk/client-s3");
const multer = require('multer');
var multerS3 = require("multer-s3");
const path = require("path")
const { v4: uuidv4 } = require('uuid');
// var multerS3 = require("multer-s3-v2");


// Set up AWS credentials
const s3=new S3Client({
  credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_BUCKET_REGION
});


const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: process.env.AWS_BUCKET_NAME, // change it as per your project requirement
  acl: "public-read", // storage access type
  metadata: (req, file, cb) => {
      cb(null, {fieldname: file.fieldname})
  },
  key: (req, file, cb) => {
      const fileKey = `${uuidv4()}_${file.originalname}`;
      const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
      cb(null, fileName);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
  contentDisposition: 'inline'
});

// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = [".png", ".jpg", ".jpeg"];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
      path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
      return cb(null, true); // no errors
  } else {
      // pass error msg to callback, which can be displaye in frontend
      cb("Error: File type not allowed!");
  }
}

// our middleware
const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback)
  },
  limits: {
      fileSize: 1024 * 1024 * 3 // 3mb file size
  }
})

module.exports = uploadImage;