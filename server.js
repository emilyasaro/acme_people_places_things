const {
  syncAndSeed,
  models: { Person, Place, Thing },
} = require('./db.js');
const express = require('express');
const app = express();
const html = require('html-template-tag');

app.get('/', async (req, res, next) => {
  try {
    const [people, things, places] = await Promise.all([
      Person.findAll(),
      Thing.findAll(),
      Place.findAll(),
    ]);
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
          <form method="POST" action="/purchase/${purchase.id}">
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
          <ul></ul>
        </body>
      </html>
    `);
  } catch (ex) {
    next(ex);
  }
});

app.post('/purchase/:id', async (req, res, next) => {});

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
