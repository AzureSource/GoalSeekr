const db = require('../../database');

//
function getAllTasks(req, res) {
  const queryString = `
    SELECT * FROM tasks;
  `;

  db(queryString)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Error retrieving all tasks line 11:\n', err);
      res.sendStatus(501);
    });
}

//
function getTasksByDifficulty(req, res) {
  const queryString = `
    SELECT * FROM tasks
    WHERE UPPER(difficulty) = $1;
  `;
  const values = [req.params.difficulty];

  db(queryString, values)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Error retrieving all tasks line 11:\n', err);
      res.sendStatus(501);
    });
}

//this probably wont work fully correct. Figure out how to add values arr to request.
function addTask(req, res) {
  const values = req.params.values;
  const queryString = `
  INSERT INTO tasks(description, reward, difficulty)
  VALUES ($1, $2, $3);
  `;

  db(queryString, values)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Error retrieving all tasks line 11:\n', err);
      res.sendStatus(501);
    });
}

// need to know what users table will look like
// and how to get current user to implement this
function getCurrencyByUser(req, res) {
  res.sendStatus(501);
  return;
  // const queryString = `
  //   SELECT ut.user_id, SUM(t.reward)
  //   FROM user_tasks ut
  //   JOIN tasks t
  //   ON ut.task_id = t.task_id
  //   WHERE ut.user_id = //someuser//;
  // `;
  // const values = [req.params.difficulty];

  // db(queryString, values)
  //   .then((result) => res.send(result.rows))
  //   .catch((err) => {
  //     console.log('Error retrieving all tasks line 11:\n', err);
  //     res.sendStatus(501);
  //   });
}

module.exports.getAllTasks = getAllTasks;
module.exports.getTasksByDifficulty = getTasksByDifficulty;
module.exports.addTask = addTask;
module.exports.getCurrencyByUser = getCurrencyByUser;