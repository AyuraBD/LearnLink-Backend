import express from "express";
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/GlobalErrorHandler";
import { notFound } from "./middleware/notFound";
import { tutorRouter } from "./modules/tutor/tutor.route";
import { categoryRouter } from "./modules/category/category.route";
import { bookingRouter } from "./modules/booking/booking.route";
import { reviewRouter } from "./modules/review/review.route";
import { userRouter } from "./modules/user/user.route";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.get('/', (req, res)=>{
  res.send(`Express server is running`)
});

app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter)
app.use('/api/tutors', tutorRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/auth/', userRouter);


app.use(errorHandler);
app.use(notFound);

export default app;