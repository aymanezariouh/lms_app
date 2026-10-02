import express from "express";
import {
  getCourses,
  getCourseById,
  getModulesByCourse,
  getResourcesByModule,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.get("/:id/modules", getModulesByCourse);
router.get("/modules/:moduleId/resources", getResourcesByModule);

export default router;
