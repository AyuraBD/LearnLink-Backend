import { userService } from "./user.service";
const getUser = async (req, res, next) => {
    try {
        const result = await userService.getUser();
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
        const result = await userService.getMyUser(user?.id);
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
        const result = await userService.updateUser(id, data);
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
        const result = await userService.updateOwnUser(user?.id, data);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
export const userController = {
    getUser,
    updateUser,
    getMyUser,
    updateOwnUser
};
//# sourceMappingURL=user.controller.js.map