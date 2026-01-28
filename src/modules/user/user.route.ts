import express from 'express';
import { userController } from './user.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';
const router = express.Router();

router.get('/', authMiddleware(UserRole.ADMIN), userController.getUser);

router.get('/me', authMiddleware(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR), userController.getMyUser);

router.patch('/:id', authMiddleware(UserRole.ADMIN), userController.updateUser);

export const userRouter = router;