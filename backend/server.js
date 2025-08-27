import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import process from "process";
import path from "path";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening on port:${PORT}`);
  });
});
