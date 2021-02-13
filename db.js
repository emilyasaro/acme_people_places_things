// where we create our tables

const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_people_places_things')

const Person = db.define('person', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false
  }
})

// const Place = db.define('place', {
//   name: {
//     type: STRING,
//     unique: true,
//     allowNull: false
//   }
// })

// const Thing = db.define('thing', {
//   name: {
//     type: STRING,
//     unique: true,
//     allowNull: false
//   }
// })

// const Purchase = db.define('purchase', {
//   quantity: {
//     type: INTEGER,
//     allowNull: false
//     },
//   time: {
//     type: DATE
//   }
// })

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [ moe, lucy, curly ] = await Promise.all(
    [ 'moe', 'lucy', 'curly' ].map( name => Person.create({ name }))
  )
}

module.exports = {
  syncAndSeed,
  models: {
    Person,
    // Place, Thing, Purchase
  }
}
