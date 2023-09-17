const express = require("express");

const router = express.Router();
const Task = require("../models/TaskList");
const CandidateData = require("../models/CandidateData");
const ElectionData = require("../models/ElectionData");

router.get("/getCandidateData", async (req, res) => {
  try {
    const CandidateDatalist = await CandidateData.find({});
    if (CandidateDatalist) {
      res.send(CandidateDatalist);
    } else {
      res.status(404).json({ message: "Error found" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.post("/createCandidate", async (req, res) => {
  try {
    var electionId;
    var electionName = req.body.electionName;
    const electionObj = await ElectionData.findOne({ name: electionName });
    console.log(await electionObj);
    if (electionObj) {
      electionId = electionObj._id;
      // console.log(electionId);
    }
    if (!electionObj) {
      console.log("Error");
    }
    // console.log(electionObj);

    await CandidateData.create({
      name: req.body.userName,
      electionId: electionId,
      party: req.body.party,
      nomineeId: req.body.nomineeId,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
});

router.delete("/deleteCandidate/:id", async (req, res) => {
  const { id } = req.params;
  await CandidateData.findByIdAndDelete(id)
    .then((deletedRow) => {
      if (!deletedRow) {
        return res.status(404).json({ error: "Row not found" });
      }

      return res.status(200).json({ message: "Row deleted successfully" });
    })
    .catch((error) => {
      return res.status(404).json({ error: "Row not found" });
    });
});

module.exports = router;
