// import { unlinkSync } from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import invariant from 'tiny-invariant'


invariant(process.env.CLOUDNAME, "CLOUDNAME must be set")
invariant(process.env.CLOUDAPIKEY, "CLOUDAPIKEY must be set")
invariant(process.env.CLOUDINARYSECRET, "CLOUDINARYSECRET must be set")

class CloudinaryUtil {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.CLOUDAPIKEY,
            api_secret: process.env.CLOUDINARYSECRET,
            secure: true
        })
    }

    async uploadImage(imageToUpload: string, filename: string, folder: string) {
        try {
            const uploadResponse = await cloudinary.uploader.upload(
                imageToUpload,
                {
                    public_id: filename,
                    folder: `portfolio/${folder}`
                }
            )

            const { secure_url } = uploadResponse
            // unlinkSync(imageToUpload)
            if (!secure_url) throw new Error("Could not uplaod image.")

            return {
                isSuccess: true,
                message: "Successfully uploaded image.",
                imageURL: secure_url,
            }
        } catch (error) {
            // unlinkSync(imageToUpload)
            console.log(error)
            return {
                isSuccess: false,
                message: "Internal Server Error",
            }
        }
    }

    async deleteImage(publicId: string) {
        try {
            const uploadResponse = await cloudinary.uploader.destroy(publicId)
            if (!uploadResponse.result) throw new Error("Could not uplaod image.")

            return {
                isSuccess: true,
                message: "Successfully deleted image",
            }
        } catch (error) {
            console.log(error)
            return {
                isSuccess: false,
                message: "Could not delete image",
            }
        }
    }
    // createSignature(timestamp) {
    //     const signature = cloudinary.utils.api_sign_request({ timestamp }, cloudinaryConfig.api_secret);
    //     return { api_key: cloudinaryConfig.api_key, cloud_name: cloudinaryConfig.cloud_name, timestamp, signature };
    // }

    // validatedSignature(payload, signature) {
    //     const expectedSignature = cloudinary.utils.api_sign_request(payload, cloudinaryConfig.api_secret);

    //     if (expectedSignature === signature) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}

export const Cloudinary = new CloudinaryUtil()