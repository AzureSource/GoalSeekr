const db = require('../../database');

function getChatsByGalId(req, res) {
  const queryString = `
    SELECT getchatmessagesbygalaxy($1);
  `;
  const values = [req.params.gal_id];

  db(queryString, values)
    .then((result) => res.send(result.rows[0].getchatmessagesbygalaxy.Messages))
    .catch((err) => {
      console.log('Error retrieving chats by galaxy line 11:\n', err);
      res.sendStatus(501);
    });
}

function addChatByGalId(req, res) {
  const queryString = `
    INSERT INTO chat(message, user_id, galaxy_id, alliance_only)
    VALUES ($1, $2, $3, false);
  `;
  const values = [req.body.message, req.body.userID, req.params.gal_id];
  console.log(values, 'ibraheeeem values')

  db(queryString, values)
    .then((result) => res.send(result))
    .catch((err) => {
      console.log('Error posting chat line 27:\n', err);
      res.sendStatus(501);
    });
}

module.exports.getChatsByGalId = getChatsByGalId;
module.exports.addChatByGalId = addChatByGalId;