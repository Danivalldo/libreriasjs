import express from "express";

const app = express();
const PORT = 6006;

app.get("/", (req, res, next) => {
  res.status(200).send("<h1>Hello world!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});
