import { prisma } from "../../lib/prisma";
const getCategory = async () => {
    const res = await prisma.category.findMany();
    return res;
};
const createCategory = async (data) => {
    const res = await prisma.category.create({
        data
    });
    console.log(res);
    return res;
};
const updateCategory = async (paramId, data) => {
    return await prisma.category.update({
        where: {
            id: paramId
        },
        data
    });
};
const deleteCategory = async (paramId) => {
    return await prisma.category.delete({
        where: {
            id: paramId
        }
    });
};
export const categoryService = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.service.js.map