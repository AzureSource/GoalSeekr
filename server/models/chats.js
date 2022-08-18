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

module.exports.getChatsByGalId = getChatsByGalId;