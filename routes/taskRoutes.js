import { Router } from "express";
import { body } from "express-validator";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import validateRequest from "../middleware/validateRequest.js";

const router = Router();

router.use(protect);

const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 120 })
    .withMessage("Title must be at most 120 characters"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be pending or completed"),
  validateRequest
];

const updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 120 })
    .withMessage("Title must be at most 120 characters"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be pending or completed"),
  validateRequest
];

router.route("/").get(getTasks).post(createTaskValidation, createTask);
router.route("/:id").patch(updateTaskValidation, updateTask).delete(deleteTask);

export default router;
