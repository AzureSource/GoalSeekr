const query = require('../../database');

const handleResponse = (res, code, data) => res.status(code).send(data);
const handleError = (res, err) => res.status(500).send(err);

module.exports = {
  postGalaxy(req, res) {
    query()
      .then(({rows}) => handleResponse(res, 201, rows[0]))
      .catch(err => handleError(res, err));
  },
};