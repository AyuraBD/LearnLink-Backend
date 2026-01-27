import express from "express";
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/GlobalErrorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.get('/', (req, res)=>{
  res.send(`Express server is running`)
});

app.use(errorHandler);
app.use(notFound);

export default app;