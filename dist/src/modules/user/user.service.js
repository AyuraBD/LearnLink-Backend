import { prisma } from "../../lib/prisma";
const getUser = async () => {
    return await prisma.user.findMany();
};
const getMyUser = async (id) => {
    return await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });
};
const updateUser = async (paramId, data) => {
    return await prisma.user.update({
        where: {
            id: paramId
        },
        data
    });
};
const updateOwnUser = async (userId, data) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data
    });
};
export const userService = {
    getUser,
    updateUser,
    getMyUser,
    updateOwnUser
};
//# sourceMappingURL=user.service.js.map