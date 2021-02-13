// where we create our tables

const Sequelize = require('sequelize');
const { STRING, INTEGER, DATE } = Sequelize;

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_people_places_things', { logging: false }
);

const Person = db.define('person', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const Place = db.define('place', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const Thing = db.define('thing', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

const Purchase = db.define('purchase', {
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
  date: {
    type: DATE,
  },
  // personId,
  // thingId
  // placeId

});

Person.hasMany(Thing);
//Thing.belongsToMany(Person, { through: Thing.name });
Person.hasMany(Place);
//Place.belongsToMany(Person);
Purchase.belongsTo(Person);
Purchase.belongsTo(Thing);
Purchase.belongsTo(Place);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [moe, lucy, larry] = await Promise.all(
    ['moe', 'lucy', 'larry'].map((name) => Person.create({ name }))
  );
  const [NYC, Chicago, LA, Dallas] = await Promise.all(
    ['NYC', 'Chicago', 'LA', 'Dallas'].map((name) => Place.create({ name }))
  );
  const [foo, bar, bazz, quq] = await Promise.all(
    ['foo', 'bar', 'bazz', 'quq'].map((name) => Thing.create({ name }))
  );
  const purchThing1 = await Purchase.create({
    thingId: 1,
    personId: 1,
    placeId: 3,
    quantity: 3,
    date: '10/31/2020'
   })
   const purchThing2 = await Purchase.create({
    thingId: 2,
    personId: 3,
    quantity: 1,
    placeId: 2,
    date: '11/06/2019'
   })
   const purchThing3 = await Purchase.create({
    thingId: 3,
    personId: 2,
    quantity: 11,
    placeId: 2,
    date: '03/15/2020'
   })
};

module.exports = {
  syncAndSeed,
  models: {
    Person,
    Place,
    Thing,
    Purchase
  },
};
