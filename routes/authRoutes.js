import { Router } from "express";
import { body } from "express-validator";
import { login, signup } from "../controllers/authController.js";
import validateRequest from "../middleware/validateRequest.js";

const router = Router();

const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2, max: 60 }).withMessage("Name must be between 2 and 60 characters"),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .withMessage("Password must contain at least one letter and one number"),
  validateRequest
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequest
];

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
