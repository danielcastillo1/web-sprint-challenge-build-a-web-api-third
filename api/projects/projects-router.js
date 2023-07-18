// Write your "projects" router here!
const Projects = require("./projects-model.js");
const {
  checkId,
  checkBody,
  checkPostBody,
} = require("./projects-middleware.js");

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      if (!projects) {
        res.status(404).json([]);
      } else {
        res.status(200).json(projects);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "there was an error" });
    });
});

router.post("/", checkPostBody, (req, res) => {
  Projects.insert(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "there was an error" });
    });
});

router.get("/:id", checkId, (req, res) => {
  res.json(req.project);
});

router.put("/:id", checkId, checkBody, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "there was an error" });
    });
});

router.delete("/:id", checkId, (req, res) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "there was an error" });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.json(actions);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "there was an error" });
    });
});

module.exports = router;
