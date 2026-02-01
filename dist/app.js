"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const GlobalErrorHandler_1 = __importDefault(require("./middleware/GlobalErrorHandler"));
const notFound_1 = require("./middleware/notFound");
const tutor_route_1 = require("./modules/tutor/tutor.route");
const category_route_1 = require("./modules/category/category.route");
const booking_route_1 = require("./modules/booking/booking.route");
const review_route_1 = require("./modules/review/review.route");
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}));
app.all('/api/auth/*splat', (0, node_1.toNodeHandler)(auth_1.auth));
app.get('/', (req, res) => {
    res.send(`Express server is running`);
});
app.use('/api/users', user_route_1.userRouter);
app.use('/api/categories', category_route_1.categoryRouter);
app.use('/api/tutors', tutor_route_1.tutorRouter);
app.use('/api/bookings', booking_route_1.bookingRouter);
app.use('/api/reviews', review_route_1.reviewRouter);
app.use('/api/auth/', user_route_1.userRouter);
app.use(GlobalErrorHandler_1.default);
app.use(notFound_1.notFound);
exports.default = app;
//# sourceMappingURL=app.js.map