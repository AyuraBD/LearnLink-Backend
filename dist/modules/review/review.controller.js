"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const getReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await review_service_1.reviewService.getReview(id);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const getOwnReview = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await review_service_1.reviewService.getOwnReview(user?.id);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const createReview = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const result = await review_service_1.reviewService.createReview(user?.id, id, req.body);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
exports.reviewController = {
    getReview,
    createReview,
    getOwnReview
};
//# sourceMappingURL=review.controller.js.map