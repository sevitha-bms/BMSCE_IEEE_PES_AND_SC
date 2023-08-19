const express = require("express");
const router = express.Router();
const Execom = require("../models/ExecomModel");

router.get("/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const team = await Execom.find({ year: year }).sort({ order: 1 });

    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { _id, year, name, designation, order, imgLink } = req.body;

    const updatedEvent = await Execom.findByIdAndUpdate(
      _id,
      {
        year,
        name,
        designation,
        order,
        imgLink,
      },
      { new: true }
    );
    res.send("success");
  } catch (error) {
    res.status(500).send("fail");
  }
});

router.post("/delete", async (req, res) => {
  const year = req.body.year;
  const name = req.body.name;
  const designation = req.body.designation;

  try {
    const deletedEvents = await Execom.deleteOne({
      year: year,
      name: name,
      designation: designation,
    });
    if (deletedEvents.deletedCount > 0) {
      res.send("success");
    } else {
      res.send("fail");
    }
  } catch (error) {
    console.log(error);
    res.send("fail");
  }
});

router.post("/input", async (req, res) => {
  const year = req.body.year;
  const name = req.body.name;
  const designation = req.body.designation;
  const order = req.body.order;
  const imgLink = req.body.imgLink;

  const event = new Execom({
    year: year,
    name: name,
    designation: designation,
    order: order,
    imgLink: imgLink,
  });

  try {
    await event.save();
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("fail");
  }
});

module.exports = router;
