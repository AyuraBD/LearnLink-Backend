import express from "express";
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/GlobalErrorHandler";
import { notFound } from "./middleware/notFound";
import { tutorRouter } from "./modules/tutor/tutor.route";
import { categoryRouter } from "./modules/category/category.route";
import { bookingRouter } from "./modules/booking/booking.route";

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

app.use('/api/category', categoryRouter)
app.use('/api/tutor', tutorRouter);
app.use('/api/booking', bookingRouter);

app.use(errorHandler);
app.use(notFound);

export default app;