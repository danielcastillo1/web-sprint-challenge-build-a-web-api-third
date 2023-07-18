// Write your "actions" router here!
const express = require("express");

const Actions = require("./actions-model");
const router = express.Router();
const {
  checkId,
  checkBody,
  checkPostBody,
} = require("./actions-middlware.js");

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      if (!actions) {
        res.status(404).json([]);
      } else {
        res.status(200).json(actions);
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
  Actions.insert(req.body)
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
  res.json(req.actions);
});

router.put("/:id", checkId, checkBody, (req, res) => {
  Actions.update(req.params.id, req.body)
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
  Actions.remove(req.params.id)
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

module.exports = router;
