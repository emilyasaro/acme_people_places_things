// where we create our tables

const Sequelize = require('sequelize');
const { STRING, INTEGER, DATE } = Sequelize;

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_people_places_things'
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
});

Person.hasMany(Thing);
//Thing.belongsToMany(Person, { through: Thing.name });
Person.hasMany(Place);
//Place.belongsToMany(Person);
Purchase.belongsTo(Person);
Purchase.belongsTo(Thing);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [moe, lucy, curly] = await Promise.all(
    ['moe', 'lucy', 'curly'].map((name) => Person.create({ name }))
  );
  const [NYC, Chicago, LA, Dallas] = await Promise.all(
    ['NYC', 'Chicago', 'LA', 'Dallas'].map((name) => Place.create({ name }))
  );
  const [foo, bar, bazz, quq] = await Promise.all(
    ['foo', 'bar', 'bazz', 'quq'].map((name) => Thing.create({ name }))
  );
};

module.exports = {
  syncAndSeed,
  models: {
    Person,
    Place,
    Thing,
    //Purchase
  },
};
