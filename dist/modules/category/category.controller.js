"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
const getCategory = async (req, res, next) => {
    try {
        const result = await category_service_1.categoryService.getCategory();
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const createCategory = async (req, res, next) => {
    try {
        const result = await category_service_1.categoryService.createCategory(req.body);
        res.status(201).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await category_service_1.categoryService.updateCategory(id, req.body);
        res.status(201).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await category_service_1.categoryService.deleteCategory(id);
        res.status(201).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
exports.categoryController = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map