"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = require("../../lib/prisma");
const getUser = async () => {
    return await prisma_1.prisma.user.findMany();
};
const getMyUser = async (id) => {
    return await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });
};
const updateUser = async (paramId, data) => {
    return await prisma_1.prisma.user.update({
        where: {
            id: paramId
        },
        data
    });
};
const updateOwnUser = async (userId, data) => {
    return await prisma_1.prisma.user.update({
        where: {
            id: userId
        },
        data
    });
};
exports.userService = {
    getUser,
    updateUser,
    getMyUser,
    updateOwnUser
};
//# sourceMappingURL=user.service.js.map