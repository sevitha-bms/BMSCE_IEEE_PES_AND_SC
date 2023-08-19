const express = require("express");
const connectToMongo = require("./connect");
const animationsRoutes = require('./Routes/animationsRoutes');
const loginRoutes = require('./Routes/loginRoutes');
const contactRoutes = require('./Routes/contactRoutes');
const eventsRoutes = require('./Routes/eventsRoutes');
const execomRoutes = require('./Routes/execomRoutes');
const PesDayRoutes = require('./Routes/pesDayRoutes');
const imagesRoutes = require('./Routes/imagesRoutes');
const countDocuments = require('./Routes/countDocuments');

connectToMongo();

const app = express();
const port = 4000;

app.use(express.json());

app.use('/api/animations' , animationsRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/events' , eventsRoutes);
app.use('/api/PES_DAY' , PesDayRoutes);
app.use('/api/execom' , execomRoutes);
app.use('/api/images' , imagesRoutes);
app.use('/api/count', countDocuments);

app.listen(port , ()=>{
    console.log(`Server is running on https://localhost:${port}`);
})