
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import livekitRoutes from "./routes/livekit.routes.js";

dotenv.config();

const app = express();
app.use("/api/livekit", livekitRoutes);

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Health check API
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Gaming Voice Backend is running!",
        status: "healthy"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Gaming Voice API running on port ${PORT}`);
});
