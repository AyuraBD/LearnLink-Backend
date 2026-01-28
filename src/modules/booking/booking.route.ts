import express from 'express';
import { bookingController } from './booking.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';
const router = express.Router();

router.get("/get", authMiddleware(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR), bookingController.getBooking);

router.post("/create/:id", authMiddleware(UserRole.STUDENT), bookingController.createBooking);

router.patch("/update/:id", authMiddleware(UserRole.TUTOR), bookingController.updateBooking);


// router.patch("/create/:id", authMiddleware(UserRole.STUDENT), bookingController.createBooking);

export const bookingRouter = router;