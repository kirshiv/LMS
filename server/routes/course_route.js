import express from "express";
import {
  courseLecture,
  createCourse,
  createLecture,
  deleteLecture,
  editLecture,
  getCourse,
  getCourseEnrolled,
  getLectureById,
  getPublishedCourse,
  publishCourse,
  searchQuery,
  updateCourse,
} from "../controllers/course_controller.js";
import isAuthenicated from "../middlewares/isAuthenicated.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/").post(isAuthenicated, createCourse);
router.route("/search").get(isAuthenicated,searchQuery);
router.route("/get-courses").get(isAuthenicated, getPublishedCourse);
router.route("/published-courses").get(getCourseEnrolled);
router
  .route("/:courseId")
  .put(isAuthenicated, upload.single("courseThumbnail"), updateCourse);
router.route("/:courseId").get(isAuthenicated, getCourse);
router.route("/:courseId/lecture").post(isAuthenicated, createLecture);
router.route("/:courseId/lecture").get(isAuthenicated, courseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenicated, editLecture);
router.route("/lecture/:lectureId").get(isAuthenicated, getLectureById);
router.route("/lecture/:lectureId").delete(isAuthenicated, deleteLecture);
router.route("/:courseId").patch(isAuthenicated, publishCourse);
export default router;
