import express from "express";
import oauthRoutes from "./routes/oauth";

const app = express();
app.use(express.json());

app.use("/auth", oauthRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth service running on ${PORT}`));
