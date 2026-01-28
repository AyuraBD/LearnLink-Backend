import express from 'express';
import authMiddleware, { UserRole } from '../../middleware/auth';
import { reviewController } from './review.controller';
const router = express.Router();

// router.get("/get", authMiddleware(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR), bookingController.getBooking);

router.post("/create/:id", authMiddleware(UserRole.STUDENT), reviewController.createReview);

// router.patch("/update/:id", authMiddleware(UserRole.TUTOR), bookingController.updateBooking);


// router.patch("/create/:id", authMiddleware(UserRole.STUDENT), bookingController.createBooking);

export const reviewRouter = router;