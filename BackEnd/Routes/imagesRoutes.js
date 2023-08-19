const express = require("express");
const router = express.Router();
const Images = require("../models/ImagesModel");

router.get("/:poster", async (req, res) => {
  try {
    const poster = req.params.poster;
    const events = await Images.find({posterType: poster}).sort({order: 1});

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:poster/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const poster = req.params.poster;
    const events = await Images.findOne({posterType: poster , imgName:name});

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { _id, posterType, order, imgName, imgLink } = req.body;

    const updatedEvent = await Images.findByIdAndUpdate(
      _id,
      {
        posterType,
        imgName,
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

router.post('/input' , async(req,res) => {
  const posterType = req.body.posterType;
  const imgName = req.body.imgName;
  const imgLink = req.body.imgLink;
  const order = req.body.order;

  const event = new Images({
     posterType: posterType,
      imgName: imgName,
      order: order,
      imgLink: imgLink
  })

  try {
      await event.save();
      res.send("success");
    } catch (error) {
      res.send("fail");
    }
})

router.post('/delete', async (req, res) => {
  const imgName = req.body.imgName;
  try {
    const deletedEvents = await Images.deleteOne({ imgName: imgName });
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
