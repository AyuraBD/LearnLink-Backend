"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const getUser = async (req, res, next) => {
    try {
        const result = await user_service_1.userService.getUser();
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const getMyUser = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await user_service_1.userService.getMyUser(user?.id);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await user_service_1.userService.updateUser(id, data);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const updateOwnUser = async (req, res, next) => {
    try {
        const user = req.user;
        const data = req.body;
        const result = await user_service_1.userService.updateOwnUser(user?.id, data);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
exports.userController = {
    getUser,
    updateUser,
    getMyUser,
    updateOwnUser
};
//# sourceMappingURL=user.controller.js.map