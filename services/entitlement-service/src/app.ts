import express from "express";
import entitlementRoutes from "./routes/entitlement";

const app = express();
app.use(express.json());
app.use("/entitlement", entitlementRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Entitlement service running on ${PORT}`));
