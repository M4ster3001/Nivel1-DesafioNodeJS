const express = require("express");

const Validate = require("./middleware/validate")
const logs = require("./middleware/Logs")

const { v4: uuid } = require('uuid');

const routes = express()

routes.use(express.json())

routes.use(logs)
routes.use("/repositories/:id", Validate)

const repositories = [];

routes.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

routes.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body

    if(!title || !url || !techs) {

      return response.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    }

    repositories.push(repository)

    return response.json(repository)
});

routes.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body

  const {id} = request.params

  const repositoryIndex = repositories.findIndex( repository => repository.id === id )

  if( repositoryIndex < 0 ) {

    return response.status(400).json({ error: "Repositório não encontrado" })
  }

  const repository = {
    id,
    title, 
    url, 
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
});

routes.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex( repository => repository.id === id )

  if( repositoryIndex < 0 ) {

    return response.status(400).json({ error: "Repositório não encontrado" })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

routes.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repositoryIndex = repositories.findIndex( repository => repository.id === id )

  if( repositoryIndex < 0 ) {

    return response.status(400).json({ error: "Repositório não encontrado" })
  }

  const repository = {
    id,
    title: repositories[repositoryIndex].title, 
    url: repositories[repositoryIndex].url, 
    techs: repositories[repositoryIndex].techs,
    likes: ( repositories[repositoryIndex].likes + 1 )
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
});

module.exports = routes;