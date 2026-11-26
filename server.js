const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (req, res) => {
  res.json({
    project: "OrganizaIF",
    status: "protótipo inicial",
    message: "Servidor Express funcionando."
  });
});

app.listen(PORT, () => {
  console.log(`OrganizaIF disponível em http://localhost:${PORT}`);
});
