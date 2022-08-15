const client = require('../../database');

module.exports = {
//post
  checkUser: function(req,res){
    // const query = `SELECT createorupdateuser(googleuid, username, email) VALUES(${req.body.googleuid,req.body.displayname,req.body.email})`;
    const query = 'SELECT * from users';
    debugger;
    client(query,[])
      .then(()=>res.sendStatus(201))
      .catch(()=>res.status(500).send('Error in checking existing user using google uid'));
  },
  //put
  checkGalaxyName:function(req,res){
    client(`SELECT * FROM galaxies WHERE name = ${req.query.name}`)
      .then(()=>res.sendStatus(200))
      .catch(()=>res.status(400).send('Error in check galaxy name'));
  }
};