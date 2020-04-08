const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const repository = { id: uuid(), url, title, techs, likes: 0 };
  repositories.push(repository);
  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;
  const repository = repositories.find((r) => r.id === id);
  if (!repository) return response.status(400).end();
  repository.url = url;
  repository.title = title;
  repository.techs = techs;
  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((r) => r.id === id);
  if (index === -1) return response.status(400).end();
  repositories.splice(index, 1);
  return response.status(204).end();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find((r) => r.id === id);
  if (!repository) return response.status(400).end();
  repository.likes++;
  return response.status(200).json(repository);
});

module.exports = app;
