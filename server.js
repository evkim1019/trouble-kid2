const { syncAndSeed, models: { User, Amenity, Booking }, conn } = require('./db')
const express = require('express');
const path = require('path');
const app = express();

app.use('./dist', express.static(path.join(__dirname, 'dist')))
app.get('/', async(req, res, next) => {
  try{
    res.sendFile(path.join(__dirname, 'index.html'))
  }
  catch(err){
    console.log(err);
  }
})

const init = async() => {
  await syncAndSeed();
  const port = process.env.PORT || 3000;
  app.listen( port, () => `Listening on port ${port}`)
}
init();