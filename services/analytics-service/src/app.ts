import express from "express";
import eventsRoutes from "./routes/events";

const app = express();
app.use(express.json());
app.use("/analytics", eventsRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Analytics service running on ${PORT}`));
