const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config({ path: 'backend/config/.env' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// upload file to cloudinary
module.exports.uploadfile = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({
                    public_id: result.public_id,
                    url: result.url
                });
            },
            {
                resource_type: 'auto',
                folder
            }
        )
    })
}

// delete file from cloudinary
module.exports.removefile = async (file) => {
    const res = await cloudinary.uploader.destroy(file);
    if (res.result === 'ok') {
        return true;
    }
}