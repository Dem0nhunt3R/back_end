const {userService} = require("../services");
const CustomError = require("../errors/CustomError");
const {hashPassword} = require("../services/password.service");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await hashPassword(req.body.password);

            const user = await userService.createUser({...req.body, password: hashedPassword})
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {id = ''} = req.params;

            if (id.length !== 24) {
                return next(new CustomError('Mongo Id is not valid', 403));
            }

            const user = await userService.findUser({_id: id});

            if (!user) {
                return next(new CustomError(`Use with ID ${id} is not found`, 404));
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateUser({_id: id}, {...req.body});

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteUser({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}



