"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const getCategory = async () => {
    const res = await prisma_1.prisma.category.findMany();
    return res;
};
const createCategory = async (data) => {
    const res = await prisma_1.prisma.category.create({
        data
    });
    console.log(res);
    return res;
};
const updateCategory = async (paramId, data) => {
    return await prisma_1.prisma.category.update({
        where: {
            id: paramId
        },
        data
    });
};
const deleteCategory = async (paramId) => {
    return await prisma_1.prisma.category.delete({
        where: {
            id: paramId
        }
    });
};
exports.categoryService = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.service.js.map