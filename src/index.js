const { syncAndSeed, models: { User, Amenity, Booking }, conn } = require('./db');


const displayBookings = async(reserv) =>{
  const bookingList = document.querySelector('#booking-list');
  bookingList.innerHTML = reserv.map(res => `<li><a>${reserv.user.id}</a></li>`)
}