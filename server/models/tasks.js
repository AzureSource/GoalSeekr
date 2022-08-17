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

//
function getCurrencyByUser(req, res) {
  const queryString = `
    SELECT currency
    FROM users
    WHERE id = $1;
  `;
  const values = [req.params.userid];

  db(queryString, values)
    .then((result) => res.send(result.rows[0].currency.toString()))
    .catch((err) => {
      console.log('Error getCurrencyByUser line 62:\n', err);
      res.sendStatus(501);
    });
}

function getTaskStatusByUser(req, res) {
  const queryString = `
    SELECT iscompleted
    FROM tasks_user
    WHERE user_id = $1
    AND task_id = $2;
  `;
  const values = [req.params.userid, req.params.taskid];

  db(queryString, values)
    .then((result) => res.send(result.rows[0].iscompleted))
    .catch((err) => {
      console.log('Error getTaskStatusByUser line 78:\n', err);
      res.sendStatus(501);
    });
}

function updateTaskStatusByUser(req, res) {
  console.log('update task status by user');
  const queryString = `
    SELECT toggletaskforuser($1, $2);
  `;
  const values = [req.params.userid, req.params.taskid];
  console.log(values);

  db(queryString, values)
    .then((result) => res.send([result.command, result.rowCount]))
    .catch((err) => {
      console.log('Error updateTaskStatusByUser line 78:\n', err);
      res.sendStatus(501);
    });
}

module.exports.getAllTasks = getAllTasks;
module.exports.getTasksByDifficulty = getTasksByDifficulty;
module.exports.addTask = addTask;
module.exports.getCurrencyByUser = getCurrencyByUser;
module.exports.getTaskStatusByUser = getTaskStatusByUser;
module.exports.updateTaskStatusByUser = updateTaskStatusByUser;
