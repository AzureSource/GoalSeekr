const query = require('../../database');

const handleResponse = (res, code, data) => res.status(code).send(data);
const handleError = (res, err) => res.status(500).send(err);

module.exports = {
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
    console.log('query is commented out');
    handleResponse(res, 200, 'query is commented out');
    // query(text, values)
    //   .then(({rows}) => handleResponse(res, 201, rows))
    //   .catch(err => handleError(res, err));
  },
};