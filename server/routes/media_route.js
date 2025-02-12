import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();
router.route("/uploadMedia").post(upload.single("file"), async (req, res) => {
    try {
        const result = await uploadMedia(req.file.path);
        return res.status(200).json({
            message: "Media Uploaded",
            data:result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to upload video",
            success:false
        })
        
    }
})

export default router;
