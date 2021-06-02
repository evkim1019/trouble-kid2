const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/amenity-reservation', { logging: false });
const { STRING, INTEGER } = Sequelize;

// create tables of User, Amenity and Booking
const User = conn.define('user', {
  name: {
    type: STRING
  }
});
const Amenity = conn.define('amenity', {
  name: {
    type: STRING,
    unique: true
  },
  location: {
    type: STRING,
  },
  capacity: {
    type: INTEGER
  }
});
const Booking = conn.define('booking', {});

Booking.belongsTo(User)
Booking.belongsTo(Amenity)
User.hasMany(Booking)
Amenity.hasMany(Booking)

// syncAndSeed data inside of the table
const syncAndSeed = async() => {
  await conn.sync({ force: true })
  let users = await Promise.all([ 'Sam', 'Billy', 'Joey', 'Tom'].map( name => User.create( { name } )));
  let amenityDB = [
    {
      name: 'Pool',
      location: '1st floor',
      capacity: 4
    },
    {
      name: 'Gym',
      location: '24th floor',
      capacity: 17
    },
    {
      name: 'Rooftop',
      location: '66th floor',
      capacity: 10
    }
  ];
  let amenities = await Promise.all( amenityDB.map( am => Amenity.create( {name: am.name, location: am.location, capacity: am.capacity } )) );
  let bookings = await Promise.all([
    Booking.create( { userId: 2, amenityId: 1 } ),
    Booking.create( { userId: 1, amenityId: 1 } ),
    Booking.create( { userId: 4, amenityId: 3 } ),
    Booking.create( { userId: 2, amenityId: 2 } )
  ]);

  return { users, amenities, bookings };
};

module.exports = {
  syncAndSeed,
  conn,
  models: {
    User, Amenity, Booking
  }
}