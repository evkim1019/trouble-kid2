import axios from 'axios';

const insertHTML = async() => {
  const bookingListInsert = document.querySelector('#bookingListInsert');
  const DB = (await axios.get('/db/index')).data;
  bookingListInsert.innerHTML = DB.map( booking => `<li><a href="/${booking.users.id}">${booking.userId}</a></li>`).join('')
}
insertHTML();