import { tutorService } from "./tutor.service";
const getTutorProfile = async (req, res, next) => {
    try {
        // const {search} = req.params;
        // const searchString = typeof search === 'string' ? search : undefined;
        // const rating = req.params.rating as number | undefined;
        // const price = req.params.price  as number | undefined;
        // const category = req.params.category as string | undefined;
        const result = await tutorService.getTutorProfile();
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
        const result = await tutorService.getTutorDetails(id);
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
        const result = await tutorService.getOwnTutorDetails(user?.id);
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
        const result = await tutorService.createTutorProfile(user?.id, req.body);
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
        const result = await tutorService.updateTutorProfile(user?.id, req.body);
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
        const result = await tutorService.deleteTutorProfile(user?.id);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
export const tutorController = {
    getTutorProfile,
    getOwnTutorDetails,
    createTutorProfile,
    updateTutorProfile,
    deleteTutorProfile,
    getTutorDetails
};
//# sourceMappingURL=tutor.controller.js.map