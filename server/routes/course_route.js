import express from "express";
import { createCourse, getCourse, getCourseEnrolled, updateCourse } from "../controllers/course_controller.js";
import isAuthenicated from "../middlewares/isAuthenicated.js";
import upload from "../utils/multer.js"
const router = express.Router();

router.route("/").post(isAuthenicated, createCourse);
router.route("/published-courses").get( getCourseEnrolled);
router.route("/:courseId").put(isAuthenicated, upload.single("courseThumbnail"), updateCourse);
router.route("/:courseId").get(isAuthenicated, getCourse);
router.route("/:courseId").get(isAuthenicated, getCourse);
export default router;