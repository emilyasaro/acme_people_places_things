const {
  syncAndSeed,
  models: { Person, Place, Thing, Purchase },
} = require('./db.js');
const express = require('express');
const app = express();
const html = require('html-template-tag');

app.get('/', async (req, res, next) => {
  try {
    const [people, things, places, purchases] = await Promise.all([
      Person.findAll(),
      Thing.findAll(),
      Place.findAll(),
      Purchase.findAll( {
        include: [
          {model: Place},
          {model: Person},
          {model: Thing}
        ]
      }),
    ]);
    // console.log(purchases)
    res.send(html`
      <html>
        <head>
          <title>Acme People Places Things</title>
        </head>
        <body>
          <h1>Acme People Places Things</h1>
          <div>
            <h3>People (${people.length})</h3>
            <ul>
              $${people
                .map((person) => {
                  return html` <li>${person.name}</li> `;
                })
                .join('')}
            </ul>
          </div>
          <div>
            <h3>Things (${things.length})</h3>
            <ul>
              $${things
                .map((thing) => {
                  return html` <li>${thing.name}</li> `;
                })
                .join('')}
            </ul>
          </div>
          <div>
            <h3>Places (${places.length})</h3>
            <ul>
              $${places
                .map((place) => {
                  return html` <li>${place.name}</li> `;
                })
                .join('')}
            </ul>
          </div>
          <form method="POST" >
            <select name="personId">
              <option>--person--</option>
              $${people
                .map((person) => {
                  return html` <option>${person.name}</option> `;
                })
                .join('')}
            </select>
            <select name="placeId">
              <option>--place--</option>
              $${places
                .map((place) => {
                  return html` <option>${place.name}</option> `;
                })
                .join('')}
            </select>
            <select name="thingId">
              <option>--thing--</option>
              $${things
                .map((thing) => {
                  return html` <option>${thing.name}</option> `;
                })
                .join('')}
            </select>
            <input type="number" />
            <input type="date" />
            <button>Create Purchase</button>
          </form>
          <div>
            <h3>Purchase List </h3>
                <ul>
                  $${purchases
                .map((purchase) => {
                  return html`
                  <li>
                    ${purchase.person.name} purchased ${purchase.quantity} ${purchase.thing.name} in ${purchase.place.name} on ${purchase.date}
                   </li>
                `})
                .join('')}

                </ul>
          </div>
        </body>
      </html>
    `);
  } catch (ex) {
    next(ex);
  }
}); // map through purchases. Find.all is an array itself, so try mapping. Try out Object.entries and console log

// app.post('/purchase/:id', async (req, res, next) => {});

const init = async () => {
  try {
    await syncAndSeed();
  } catch (ex) {
    console.log(ex);
  }
};

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening in port: ${PORT}`);
});

init();
