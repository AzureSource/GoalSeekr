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
    const disp_name = req.body.displayname;
    const motto = req.body.motto;
    const g_uid = req.body.googleuid;
    const g_profile_url = req.body.photoURL;
    const query = 'SELECT createorupdateuser($1, $2, $3, $4, $5, $6)';
    client(query, [g_uid, disp_name, req.body.email, motto, 'about', g_profile_url])
      .then((result) =>{
        //console.log('show result.rows: ',result.rows);
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
  },
  // update motto
  updateMotto(req, res) {
    console.log(req.body);
    client('UPDATE users SET motto = $1 WHERE username = $2', [req.body.motto, req.body.displayName])
      .then(res.status(201).end())
      .catch(res.status(500).end());
  },
};

