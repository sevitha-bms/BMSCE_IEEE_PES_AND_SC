const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    const mongoURI =
      'mongodb+srv://ieee_web:ieee1234@cluster0.qrgzpka.mongodb.net/IEEE-PES?retryWrites=true&w=majority';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection Successful!');
  } catch (error) {
    console.error('Connection Error:', error);
  }
};

module.exports = connectToMongo;