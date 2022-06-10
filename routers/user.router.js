const userRouter = require('express').Router();

const userController = require('../controllers/user.controller');

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);
userRouter.post('/', userController.createUser);

module.exports = userRouter;

