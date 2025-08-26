import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import process from "process";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening on port:${PORT}`);
  });
});
