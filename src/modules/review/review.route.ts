import express from 'express';
import authMiddleware, { UserRole } from '../../middleware/auth';
import { reviewController } from './review.controller';
const router = express.Router();

router.get("/:id", reviewController.getReview);

router.post("/create/:id", authMiddleware(UserRole.STUDENT), reviewController.createReview);


export const reviewRouter = router;