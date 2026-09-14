const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const requiredConfig = ['CLOUD_NAME', 'CLOUD_API_KEY', 'CLOUD_API_SECRET'];
const missingConfig = requiredConfig.filter((key) => !process.env[key]);
if (missingConfig.length) {
  throw new Error(`Missing Cloudinary configuration: ${missingConfig.join(', ')}`);
}

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_dev',
    allowed_formats: ["png", "jpg", "jpeg"]
  },
});
module.exports={
    cloudinary,
    storage
};