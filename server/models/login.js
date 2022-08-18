const client = require('../../database');

module.exports = {

  //get check
  checkAllUser: function(req,res){
    client('SELECT id,googleuid FROM users WHERE username = $1',[req.query.name])
      .then((result)=>{
        // console.log(result.rows);
        res.status(200).json(result.rows);
      })
      .catch(()=>res.status(400).send('Error in checking all user'));
  },
  //post
  checkUser: function (req, res) {
    // const query = `SELECT createorupdateuser(${req.body.googleuid},${req.body.displayname},${req.body.email})`;
    // client(query)
    // console.log('show google photo URl : ',req.body.photoURL);
    const query = 'SELECT createorupdateuser($1, $2, $3, $4, $5, $6)';
    client(query, [req.body.googleuid, req.body.displayname, req.body.email, 'motto', 'about', req.body.photoURL])
      .then((result) =>{
        // console.log(result.rows);
        res.json(result.rows[0].createorupdateuser.id);
      })
      .catch(() => res.status(500).send('Error in checking existing user using google uid'));
  },
  //get
  checkGalaxyName: function (req, res) {
    // console.log(req.query);
    client('SELECT id FROM galaxies WHERE name = $1',[req.query.name])
      .then(({rows}) =>{
        // console.log(rows);
        res.status(200).json(rows);
      })
      .catch(() => res.status(400).send('Error in check galaxy name'));
  }
};

