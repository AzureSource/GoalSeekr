const db = require('../../database');

function getAllPlayers(req, res) {
  const queryString = `
  SELECT getplayerdatabygalaxyid(5, false)
  `;

  db(queryString)
    .then((result) => res.send(result.rows[0].getplayerdatabygalaxyid.Players))
    .catch((err) => {
      console.log('Error retrieving all players line 11:\n', err);
      res.sendStatus(501);
    });
}

module.exports = getAllPlayers;
