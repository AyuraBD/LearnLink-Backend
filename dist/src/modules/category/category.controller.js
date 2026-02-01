import { categoryService } from "./category.service";
const getCategory = async (req, res, next) => {
    try {
        const result = await categoryService.getCategory();
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
        console.log(req.body);
        const result = await categoryService.createCategory(req.body);
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
        const result = await categoryService.updateCategory(id, req.body);
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
        const result = await categoryService.deleteCategory(id);
        res.status(201).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
export const categoryController = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=category.controller.js.map