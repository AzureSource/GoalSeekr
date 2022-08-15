const client = require('../../database');

module.exports = {
  findOne: async function (req, res) {
    try {
      const query = 'SELECT * FROM public.users WHERE id = $1';
      const results = await client(query, [req.params.user_id]);
      res.json(results.rows);
    } catch (error) {
      res.end().status(500);
    }
  },
  updateShips: async function (req, res) {
    try {
      let userId = req.params.user_id;
      let purchasedShips = req.body.data.ships;
      for (let i = 0; i < purchasedShips.length; i++) {
        let shipName = purchasedShips[i].name;
        let purchasedNumber = purchasedShips[i].count;
        for (let j = 0; j < purchasedNumber; j++) {
          const query = 'SELECT * FROM buyship($1, $2)';
          await client(query, [userId, shipName]);
        }
      }
      res.sendStatus(201);
    } catch (error) {
      res.end().status(500);
    }
  },

  updateUserName:function(req,res){
    client.query(`UPDATE users SET username = ${req.body.username} WHERE uid=${req.params.uid}`)
      .then(()=>res.sendStatus(204))
      .catch((err)=>res.status(400).send(console.log('err during put request for update username : ',err)));
  },

  createUserName: function(req,res){
    const queryString = 'INSERT INTO users (uid,username,email,profile_picture_url) VALUES ($1,$2,$3,$4)';
    const values = [req.body.uid,req.body.username,req.body.email,req.body.profile_picture_url];
    client.query(queryString,values)
      .then(()=>res.sendStatus(201))
      .catch((err)=>res.status(500).send(console.log('Error in post request for create user: ',err)));
  }


};