const client = require('../../database');

module.exports = {
  //post
  checkUser: function (req, res) {
    const query = 'SELECT * FROM createorupdateuser($1, $2, $3, $4, $5, $6)';
    client(query, ['req.body.googleuid', req.body.displayname, 'req@email.com', 'motto', 'about', 'url'])
      .then((result) =>
        res.json(result.rows[0].createorupdateuser.id)
      )
      .catch(() => res.status(500).send('Error in checking existing user using google uid'));
  },
  //put
  checkGalaxyName: function (req, res) {
    client(`SELECT * FROM galaxies WHERE name = ${req.query.name}`)
      .then(() => res.sendStatus(200))
      .catch(() => res.status(400).send('Error in check galaxy name'));
  }
};

