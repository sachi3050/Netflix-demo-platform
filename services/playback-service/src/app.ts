import express from "express";
import manifestRoutes from "./routes/manifest";
import licenseRoutes from "./routes/license";

const app = express();
app.use("/playback", manifestRoutes);
app.use("/playback", licenseRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Playback service running on ${PORT}`));
