import express from "express";
import isAuthenticated from "../middlewares/isAuthenicated.js";
import { createCheckoutSession, getAllpurchasedCourses, getCourseDetailPurchase, stripeWebhook } from "../controllers/purcahse_controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailPurchase);
router.route("/").get(isAuthenticated,getAllpurchasedCourses);  

export default router;