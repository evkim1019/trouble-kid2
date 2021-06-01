const { syncAndSeed, conn, models: {User, Amenity, Booking} } = require('./db');
const express = require('express');
const path = require('path');
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', async(req, res, next) => {
  try{
    res.sendFile(path.join(__dirname, 'index.html'))
  }
  catch(err){
    console.log(err);
  }
});

app.get('/db/index', async(req, res, next) => {
  res.send(await Booking.findAll({
    include: [{ model: User } ]
  }));
})


const init = async() => {
  await syncAndSeed();
  const port = process.env.PORT || 8081;
  app.listen(port, () => console.log(`Listening on Port ${port}`))
}
init();