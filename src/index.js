import axios from 'axios';


const insertHTML = async() => {
  const bookingListInsert = document.querySelector('#bookingListInsert');
  const DB = (await axios.get('/db/index')).data;
  console.log(DB.users)
  
  headlineInsert.innerHTML = 'headline'
  bookingListInsert.innerHTML = DB.bookings.map( booking => `<li><a href="/user/${booking.user.id}">${booking.user.name}</a> at <a href="/amenity/${booking.amenity.id}">${booking.amenity.name}</a></li>`).join('')
  userListInsert.innerHTML = DB.users.map( user => `<option value="${user.id}">${user.name}</option>`).join('')
  amenityListInsert.innerHTML = DB.amenities.map( amenity => `<option value="${amenity.id}">${amenity.name}</option>`).join('')

}
insertHTML();