// db.js

const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB;

mongoose.connect(url)
  .then(() => {
    console.log('Connected successfully to MongoDB');

    // Define a route for the root URL
    app.get('/', (req, res) => {
      res.send('Server is running!....');
    });

    // Example route to get data from a collection
    app.get('/data', async (req, res) => {
      const Data = mongoose.model('Data', new mongoose.Schema({ name: String })); // Replace with your schema
      const data = await Data.find({});
      console.log("data", data);
      res.json(data);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


module.exports = mongoose;
