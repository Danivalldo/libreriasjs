import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import { apiRouter } from "./middleware/api/index.js";
import path from "path";

const app = express();
const publicFolder = path.join(".", "frontend", "dist");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(publicFolder));

app.post("/user", (req, res, next) => {
  const { name, username, age } = req.body;

  if (!name || !username || !age) {
    return next();
  }

  res.status(200).send(`
    <div>
      <h1>Datos de usuario recibidos:</h1>
      <ul>
        <li>Nombre: ${name}</li>
        <li>Usuario: ${username}</li>
        <li>Edad: ${age}</li>
      </ul>
    </div>
  `);
});

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).send("<h1>404 - Page not found</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on: http://localhost:${process.env.PORT}/`);
});
