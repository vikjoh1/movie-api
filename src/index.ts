import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import router from "./routes/routes";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("db connected!"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use("/movies", router);
app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
