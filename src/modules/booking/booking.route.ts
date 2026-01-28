import express from 'express';
import { bookingController } from './booking.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';
const router = express.Router();

router.get("/", authMiddleware(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR), bookingController.getBooking);

router.post("/:id", authMiddleware(UserRole.STUDENT), bookingController.createBooking);

router.patch("/:id", authMiddleware(UserRole.TUTOR), bookingController.updateBooking);

export const bookingRouter = router;