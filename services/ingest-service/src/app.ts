import express from "express";
import uploadRoutes from "./routes/upload";

const app = express();
app.use("/ingest", uploadRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Ingest service running on ${PORT}`));
