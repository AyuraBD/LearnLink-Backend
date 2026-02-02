"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const getBooking = async (req, res, next) => {
    try {
        const user = req.user;
        const result = await booking_service_1.bookingService.getBooking(user?.id, user?.role);
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
        const result = await booking_service_1.bookingService.createBooking(user?.id, id, req.body);
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
        const result = await booking_service_1.bookingService.updateBooking(user?.id, id, req.body);
        res.status(200).json({
            result
        });
    }
    catch (err) {
        next(err);
    }
};
exports.bookingController = {
    getBooking,
    createBooking,
    updateBooking
};
//# sourceMappingURL=booking.controller.js.map