// add middlewares here related to projects
const Projects = require("./projects-model.js");

async function checkId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res
        .status(404)
        .json({
          status: 404,
          message: `Project with id ${req.params.id} does not exist`,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "there was an error" });
  }
}

function checkBody(request, response, next) {
  const { name, description, completed } = request.body;
  if (
    !name ||
    !name.trim ||
    !description ||
    !description.trim() ||
    completed === null ||
    completed === undefined
  ) {
    next({ status: 400, message: "incorrect body" });
  } else {
    request.name = name;
    request.description = description.trim();
    request.completed = completed;
    next();
  }
}

function checkPostBody(request, response, next) {
  const { name, description } = request.body;
  if (
    !name ||
    !name.trim ||
    !description ||
    !description.trim()
  ) {
    next({ status: 400, message: "incorrect body" });
  } else {
    request.name = name;
    request.description = description.trim();
    next();
  }
}

module.exports = { checkId, checkBody, checkPostBody };
