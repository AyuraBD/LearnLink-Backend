import express from 'express';
import { categoryController } from './category.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';
const router = express.Router();

router.get('/', authMiddleware(UserRole.ADMIN, UserRole.TUTOR), categoryController.getCategory);

router.get('/', categoryController.getCategoryPublic);

router.post('/create', authMiddleware(UserRole.ADMIN), categoryController.createCategory);

router.patch('/update/:id', authMiddleware(UserRole.ADMIN), categoryController.updateCategory);

router.delete('/delete/:id', authMiddleware(UserRole.ADMIN), categoryController.deleteCategory);


export const categoryRouter = router;