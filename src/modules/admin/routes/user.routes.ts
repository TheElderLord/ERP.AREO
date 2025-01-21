// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUsersRequestHandler,  createUserRequestHandler, getUserByIdHandler, updateUserRequestHandler, deleteUserRequestHandler, getBlackListREquestHandler, addToBlackListRequestHandler, removeFromBlackListRequestHandler } from '../controllers/user.controller';

const router = Router();


router.route('/').get(  getUsersRequestHandler)
.post(createUserRequestHandler);

router.route("/:id").get(getUserByIdHandler)
.put(updateUserRequestHandler)
.delete(deleteUserRequestHandler)


router.route('/:id').get( getBlackListREquestHandler)
.patch( addToBlackListRequestHandler)
.delete( removeFromBlackListRequestHandler);

export default router;
