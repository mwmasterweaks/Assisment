import express from "express";
import cors from "cors";
import agentRoutes from "./routes/Agent.routes";
import propertyRoutes from "./routes/Property.routes";
import tenantRoutes from "./routes/Tenant.routes";
import noteRoutes from "./routes/Note.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/agents", agentRoutes);
app.use("/properties", propertyRoutes);
app.use("/tenants", tenantRoutes);
app.use("/notes", noteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
