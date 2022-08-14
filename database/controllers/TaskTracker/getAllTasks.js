const db = require('../../index.js');

function getAllTasks (){
  const queryString = `
    SELECT * FROM tasks;
  `;
  return db(queryString);
}

getAllTasks()
  .then((result) => console.log(result.rows));