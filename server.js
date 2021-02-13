const { syncAndSeed, models: { Person} } = require('./db.js');

// , Place, Thing, Purchase
const init = async () => {
  try {
    await syncAndSeed()
  }
  catch(ex) {
    console.log(ex)
  }
}


init();
