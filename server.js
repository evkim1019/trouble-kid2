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
app.get('/user/:id', async(req, res, next) => {
  try{
    res.send(await User.findAll(
      {
        include: [ { model: Booking, include: [{ model: Amenity }] } ],
        where: {
          id: req.params.id
        }
      }
    ))
  }
  catch(err){
    console.log(err);
  }
});
app.get('/amenity/:id', async(req, res, next) => {
  try{
    res.send(await Amenity.findAll(
      {
        include: [ { model: Booking, include: [ {model: User }] }],
        where: {
          id: req.params.id
        }
      }
    ))
  }
  catch(err){
    console.log(err);
  }
});



app.post('/', async(req, res, next) => {
  await console.log(req.params.userId)
  res.status(201).send('hi')
  // try{
  //   res.status(201).send(await Booking.create( { userId: req.params.userId, amenityId: req.params.amenityId } ))
  // }
  // catch(err){
  //   console.log(err);
  // }
})




app.get('/db/index', async(req, res, next) => {
  const [users, amenities, bookings] = await Promise.all([
    User.findAll(),
    Amenity.findAll(),
    Booking.findAll({
      include: [{model: User}, {model: Amenity}]
    })
  ]);
  res.send({
    users, amenities, bookings
  });
})


// app.get('/users/:id', async(req, res, next) => {
//   try{
//     window.addEventListener('hashchange', () => {
//       if( location.hash === `#${id}`){
//         res.redirect('/')
//       }
//     })
//   }
//   catch(err){
//     console.log(err)
//   }
// })

const init = async() => {
  await syncAndSeed();
  const port = process.env.PORT || 8081;
  app.listen(port, () => console.log(`Listening on Port ${port}`))
}
init();