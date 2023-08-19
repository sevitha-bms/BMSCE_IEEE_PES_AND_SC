const express = require("express");
const router = express.Router();
const Events = require("../models/EventModel");
const PESDayEvents = require("../models/PESDayModel");

router.get("/:name", async (req, res) => {
  const name = req.params.name;
  let count;
  try {
    if(name === "Events"){
      count = await Events.countDocuments();
    }else if(name === "PES-DAY-EVENTS"){
      count = await PESDayEvents.countDocuments();
    }else{
      console.log("Condition yet to be handled");
    }
  }catch(error){
    console.log(error);
  }

  res.json({count});
});

module.exports = router;