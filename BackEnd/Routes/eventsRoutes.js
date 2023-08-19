const express = require("express");
const router = express.Router();
const Event = require("../models/EventModel");

router.get("/", async (req, res) => {
  try {
    const events = await Event.aggregate([
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
    const { _id, title, date, time, description, imgLink, regLink } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
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
})

router.post('/input' , async(req,res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const description = req.body.description;
  const imgLink = req.body.imgLink;
  const regLink = req.body.regLink;

  const event = new Event({
      title: title,
      date: date,
      time: time,
      description: description,
      imgLink: imgLink,
      regLink: regLink
  })

  try {
      await event.save();
      res.send("success");
    } catch (error) {
      console.log(error);
      res.send("fail");
    }
})

router.post('/delete', async (req, res) => {
  const title = req.body.title;

  try {
    const deletedEvents = await Event.deleteOne({ title: title });
    if (deletedEvents.deletedCount > 0) {
      res.send('success');
    } else {
      res.send('fail');
    }
  } catch (error) {
    console.log(error);
    res.send('fail');
  }
});

module.exports = router;