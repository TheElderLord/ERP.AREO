// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUsersRequestHandler,  createUserRequestHandler, getUserByIdHandler, updateUserRequestHandler, deleteUserRequestHandler, getBlackListREquestHandler, addToBlackListRequestHandler, removeFromBlackListRequestHandler } from '../controllers/user.controller';
import authMiddleware from '../../../middlewares/auth.middleware';

const router = Router();


router.route('/').get( authMiddleware, getUsersRequestHandler)
.post(authMiddleware,createUserRequestHandler);

router.route("/:id").get(authMiddleware,getUserByIdHandler)
.put(authMiddleware,updateUserRequestHandler)
.delete(authMiddleware,deleteUserRequestHandler)


router.route('/:id').get(authMiddleware, getBlackListREquestHandler)
.patch(authMiddleware, addToBlackListRequestHandler)
.delete(authMiddleware, removeFromBlackListRequestHandler);

export default router;
