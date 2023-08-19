const express = require("express");
const router = express.Router();
const PESDay = require("../models/PESDayModel");

router.get("/", async (req, res) => {
  try {
    const events = await PESDay.aggregate([
      { $sort: { date: 1, time: 1 } }
    ]);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { _id, title, time, date, description, imgLink, regLink } = req.body;

    const updatedEvent = await PESDay.findByIdAndUpdate(
      _id,
      {
        title,
        date,
        time,
        description,
        imgLink,
        regLink,
      },
      { new: true }
    );
    res.send("success");
  } catch (error) {
    res.status(500).send("fail");
  }
});

router.post("/input", async (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const description = req.body.description;
  const imgLink = req.body.imgLink;
  const regLink = req.body.regLink;

  const event = new PESDay({
    title: title,
    date: date,
    time: time,
    description: description,
    imgLink: imgLink,
    regLink: regLink,
  });

  try {
    await event.save();
    res.send("success");
  } catch (error) {
    res.send("fail");
  }
});

router.post("/delete", async (req, res) => {
  const title = req.body.title;
  const date = req.body.date;

  try {
    const deletedEvents = await PESDay.deleteOne({ date: date, title: title });
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

router.get("/dates/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const events = await PESDay.aggregate([
      { $match: { date: date } },
      { $sort: { date: 1, time: 1 } }
    ]);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
