// add middlewares here related to actions
const Actions = require("./actions-model.js");

async function checkId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.actions = action;
      next();
    } else {
      res
        .status(404)
        .json({
          status: 404,
          message: `Action with id ${req.params.id} does not exist`,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "there was an error" });
  }
}

function checkBody(request, response, next) {
  const { project_id, description, notes, completed } =
    request.body;
  if (
    !project_id ||
    !description ||
    !description.trim() ||
    !notes ||
    !notes.trim() ||
    completed === null ||
    completed === undefined
  ) {
    next({ status: 400, message: "incorrect body" });
  } else {
    request.projectID = project_id;
    request.description = description.trim();
    request.notes = notes.trim();
    request.completed = completed;
    next();
  }
}

function checkPostBody(request, response, next) {
  const { project_id, description, notes } = request.body;
  if (
    !project_id ||
    !description ||
    !description.trim() ||
    !notes ||
    !notes.trim()
  ) {
    next({ status: 400, message: "incorrect body" });
  } else {
    request.projectID = project_id;
    request.description = description.trim();
    request.notes = notes.trim();
    next();
  }
}

module.exports = { checkId, checkBody, checkPostBody };
