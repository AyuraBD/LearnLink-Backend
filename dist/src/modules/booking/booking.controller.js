import { bookingService } from "./booking.service";
const getBooking = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await bookingService.getBooking(user?.id, user?.role);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const createBooking = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const result = await bookingService.createBooking(user?.id, id, req.body);
        console.log(result);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
const updateBooking = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const result = await bookingService.updateBooking(user?.id, id, req.body);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
export const bookingController = {
    getBooking,
    createBooking,
    updateBooking
};
//# sourceMappingURL=booking.controller.js.map