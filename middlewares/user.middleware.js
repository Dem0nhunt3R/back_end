const CustomError = require("../errors/CustomError");
const {userValidator} = require('../validators');
const User = require('../dataBase/User');
const {userService} = require("../services");

module.exports = {
    isNewUserValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = userService.findUser({_id:id});

            if (!user) {
                return (new CustomError('User not found'));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findUser({email});

            if (user) {
                return next(new CustomError(`User with email '${email}' is already exist`, 409));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailRegistered: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                return next(new CustomError(`User with email ${email} already exist`, 409));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdatedUserValid: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}
