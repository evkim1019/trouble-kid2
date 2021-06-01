const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/amenity-reservation');

const User = conn.define('user', {
  type: STRING(20),
  allowNull: false,
  unique: true,
})
const Amenity = conn.define('amenity', {
  name: { 
    type: STRING(20),
    allowNull: false,
    unique: true,
  },
  location: {
    type: STRING(20),
    allowNull: false,
    unique: true,
  },
  capacity: {
    type: STRING(3),
    allowNull: false,
    unique: true,
  }  
})
const Booking = conn.define('booking', {})

Booking.belongsTo(User);
Booking.belongsTo(Amenity);
User.hasMany(Booking);
Amenity.hasMany(Booking);

const syncAndSeed = async() => {
  await conn.sync( {force: true} );

  let amenities = [
    {
      name: 'Pool',
      location: '3rd floor',
      capacity: '5'
    },
    {
      name: 'Rooftop',
      location: '66th floor',
      capacity: '12'
    },
    {
      name: 'Gym',
      location: '20th floor',
      capacity: '20'
    },
    {
      name: 'Grill',
      location: '5th floor',
      capacity: '15'
    },
    {
      name: 'Library',
      location: '3rd floor',
      capacity: '6'
    },
  ];

  amenities = await Promise.all(amenities.map(amenity => Amenity.create(amenity)));
  amenities = amenities.reduce((acc, amenity) => {
    acc[amenity.name] = amenity;
    return acc;
  }, {})

  let users = await Promise.all([ 'Rebecca, Mary, Tom, Terry, Bill' ].map( name => User.create( { name } )));
  users = users.reduce((acc, user) => {
    acc[user.name] = user;
    return acc;
  }, {})
  
  const bookings = await Promise.all();
  return {
    users, amenities, bookings
  }
}

module.exports = {
  syncAndSeed, conn,
  models: {
    User, Amenity, Booking
  }
}