import express from 'express';
import { tutorController } from './tutor.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';

const router = express.Router();

router.get('/', tutorController.getTutorProfile);
router.get('/me', authMiddleware(UserRole.TUTOR), tutorController.getOwnTutorDetails);
router.get('/:id', tutorController.getTutorDetails);
router.post('/create', authMiddleware(UserRole.TUTOR), tutorController.createTutorProfile);
router.patch('/update', authMiddleware(UserRole.TUTOR), tutorController.updateTutorProfile);
router.delete('/delete', authMiddleware(UserRole.TUTOR), tutorController.deleteTutorProfile);

export const tutorRouter = router