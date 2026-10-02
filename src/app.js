import express from "express";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes";
import {
  NotBeforeError,
  errorHandler,
  notfound,
} from "./middlewares/errorMiddleware";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "LMS API is running" });
});
app.use("api/courses", courseRoutes);
app.use(notfound);
app.use(errorHandler);
export default app;
