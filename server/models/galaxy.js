const client = require('../../database');

const handleResponse = (res, code, data) => res.status(code).send(data);
const handleError = (res, err) => res.status(500).send(err);

module.exports = {

  beginGame: async function (req, res) {
    try {
      const u_id = req.params.user_id;
      const g_id = req.params.galaxy_id;

      const query = `UPDATE galaxies SET gamestarted = true, activeuser = $1 WHERE id = $2;`;
      const result = await client(query, [u_id, g_id]);
      res.json(u_id);

    } catch (error) {
      res.end().status(500);
    }
  },
  //takes user id on end turn click and returns next active user
  changeTurn: async function (req, res) {
    try {
      const u_id = req.params.user_id;
      const g_id = req.params.galaxy_id;

      const query1 = `SELECT id FROM users WHERE currentgalaxy = $1;`;
      const userArray = await client(query1, [g_id]);

      var arrayOfIDs = userArray.rows.map((user) => (user.id));
      var indexof = arrayOfIDs.indexOf(Number(u_id)) + 1;

      if (indexof > userArray.length - 1) {
        indexof = 0;
      }
      const nextUserID = arrayOfIDs[indexof];

      const query2 = `UPDATE galaxies SET activeuser = $1 WHERE id = $2;`;
      const result = await client(query2, [nextUserID, g_id]);
      console.log('change turn result: ', result);
      res.json(nextUserID);

    } catch {
      res.end().status(500);
    }
  },
  getUsersGalaxyID: async function (req, res) {

    const u_id = req.params.user_id;
    try {
      const query = (`SELECT currentgalaxy FROM users WHERE id = ${u_id};`);
      const results = await client(query);
      res.json(results);
    } catch (errors) {
      res.end().status(500);
    }
  },
  postGalaxy(req, res) {
    const {
      galaxyName,
      yearsPerTurn,
      maxPlayerCount,
      alliance,
      smallGalaxy,
    } = req.body;
    const text = 'SELECT * FROM creategalaxy($1, $2, $3, $4, $5)';
    const values = [ galaxyName, yearsPerTurn, maxPlayerCount, alliance, smallGalaxy ];
    client(text, values)
      .then(({rows}) => handleResponse(res, 201, rows[0]))
      .catch(err => handleError(res, err));
  },
  getGalaxySize: async (req, res) => {
    const u_id = req.params.galaxy_id;
    try {
      const text = `SELECT smallgalaxy from galaxies WHERE id = ${u_id}`;
      const { rows } = await client(text);
      handleResponse(res, 201, rows[0]);
    }
    catch (err) {
      handleError(res, err);
    }
  }
};