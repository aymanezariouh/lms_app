import express from "express";
import cors from "cors";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";

import courseRoutes from "./routes/courseRoutes.js";
import { errorHandler, notfound } from "./middlewares/errorMiddleware.js";

// Reconstitution de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Documentation Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Route de santé
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "LMS API is running" });
});

// Routes du catalogue
app.use("/api/courses", courseRoutes);

// Middlewares d'erreur
app.use(notfound);
app.use(errorHandler);

export default app;
