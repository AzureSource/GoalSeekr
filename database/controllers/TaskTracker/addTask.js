const db = require('../../index.js');

function addTask(values){
  const queryString = `
  INSERT INTO tasks(description, reward, difficulty)
  VALUES ($1, $2, $3);
  `;
  return db(queryString, values);
}

console.log(addTask(['Have a snack', 2000, 'Easy']));

module.exports = addTask;
