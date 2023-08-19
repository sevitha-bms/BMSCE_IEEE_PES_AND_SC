const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    const mongoURI =
      'mongodb+srv://bmsce_pes:PESMongo2023@cluster0.s2ilbwr.mongodb.net/IEEE-PES?retryWrites=true&w=majority';
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