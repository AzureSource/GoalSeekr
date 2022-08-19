const db = require('../../database');

function getAllPlayers(req, res) {

  const g_id = req.params.galaxy_id;

  const queryString = `SELECT getplayerdatabygalaxyid(${g_id}, false)`;

  db(queryString)
    .then((result) => {
      console.log(result.rows[0].getplayerdatabygalaxyid.Players);

      res.send(result.rows[0].getplayerdatabygalaxyid.Players);
    })
    .catch((err) => {
      console.log('Error retrieving all players line 11:\n', err);
      res.sendStatus(501);
    });
}

module.exports = getAllPlayers;
