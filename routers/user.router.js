const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware} = require("../middlewares");

userRouter.get('/', userController.getUsers);
userRouter.post('/',
    userMiddleware.isUserUnique,
    userMiddleware.isEmailRegistered,
    userMiddleware.isNewUserValid,
    userController.createUser);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById);
userRouter.put(
    '/:id',
    userMiddleware.isUserPresent,
    userMiddleware.isUserUnique,
    userMiddleware.isUpdatedUserValid,
    userController.updateUserById
);
userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteUserById);

module.exports = userRouter;