"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorController = void 0;
const tutor_service_1 = require("./tutor.service");
const getTutorProfile = async (req, res, next) => {
    try {
        // const {search} = req.params;
        // const searchString = typeof search === 'string' ? search : undefined;
        // const rating = req.params.rating as number | undefined;
        // const price = req.params.price  as number | undefined;
        // const category = req.params.category as string | undefined;
        const result = await tutor_service_1.tutorService.getTutorProfile();
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const getTutorDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await tutor_service_1.tutorService.getTutorDetails(id);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const getOwnTutorDetails = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await tutor_service_1.tutorService.getOwnTutorDetails(user?.id);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const createTutorProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await tutor_service_1.tutorService.createTutorProfile(user?.id, req.body);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const updateTutorProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await tutor_service_1.tutorService.updateTutorProfile(user?.id, req.body);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteTutorProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await tutor_service_1.tutorService.deleteTutorProfile(user?.id);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
exports.tutorController = {
    getTutorProfile,
    getOwnTutorDetails,
    createTutorProfile,
    updateTutorProfile,
    deleteTutorProfile,
    getTutorDetails
};
//# sourceMappingURL=tutor.controller.js.map