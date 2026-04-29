import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoutes.js";
import listingRoutes from "./src/routes/listingRoutes.js";
import preferencesRoutes from "./src/routes/preferencesRoutes.js";

import {errorHandler} from "./src/middleware/errorHandlerMiddleware.js";
import {globalRateLimitMiddleware} from "./src/middleware/globalRateLimitMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(globalRateLimitMiddleware);
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }) );
// Routes
app.use('/api', authRoutes);
app.use('/api', listingRoutes);
app.use('/api', preferencesRoutes);

app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});