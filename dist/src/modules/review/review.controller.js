import { reviewService } from "./review.service";
const getReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await reviewService.getReview(id);
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
        const result = await reviewService.getOwnReview(user?.id);
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
        const result = await reviewService.createReview(user?.id, id, req.body);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
export const reviewController = {
    getReview,
    createReview,
    getOwnReview
};
//# sourceMappingURL=review.controller.js.map