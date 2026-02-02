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

// app.use(cors({
//   origin: process.env.APP_URL || "http://localhost:3000",
//   credentials: true
// }));

// Extra added coded provided below

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  "https://learnlink-frontend.vercel.app",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

// Extra added code provided up

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