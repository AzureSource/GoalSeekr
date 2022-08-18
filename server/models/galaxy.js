const client = require('../../database');

const handleResponse = (res, code, data) => res.status(code).send(data);
const handleError = (res, err) => res.status(500).send(err);

module.exports = {

  getUsersGalaxyID: async function (req, res) {

    const u_id = req.params.user_id;
    try {
      const query = (`SELECT currentgalaxy FROM users WHERE id = ${u_id};`);
      const results = await client(query);
      console.log(results.rows[0]);
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
      galaxySize,
    } = req.body;
    const text = 'SELECT * FROM creategalaxy($1, $2, $3, $4, $5)';
    const values = [ galaxyName, yearsPerTurn, maxPlayerCount, alliance, galaxySize ];
    client(text, values)
      .then(({rows}) => handleResponse(res, 201, rows[0]))
      .catch(err => handleError(res, err));
  },
};