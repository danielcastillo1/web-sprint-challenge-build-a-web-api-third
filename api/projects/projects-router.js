// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  Project.get()
    .then((projects) => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error occured while fetching projects",
      });
    });
});
