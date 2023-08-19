const express = require('express');
const router = express.Router();
const Lottie = require('../models/LottieModel');

router.get('/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const animation = await Lottie.findOne({ filename : name });

    if (animation) {
      res.send(animation.json);
    } else {
      res.status(404).send('Animation not found');
    }
  } catch (error) {
    console.log('Error retrieving animation data:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;