import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// app.use("/", postRoutes);
app.use("/user", userRoutes);

const start = async () => {
  const connectDB = await mongoose.connect(
    "mongodb+srv://syk2448:qhkOGLeU3jfGEvZu@cluster0.bf0dy6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected to MONGO_DB");
};

start();
const PORT = 9090;
app.listen(PORT, () => {
  console.log("Listening on the port ", PORT);
});
