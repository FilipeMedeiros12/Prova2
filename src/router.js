// Criar uma variável router e import router do express
// Criar uma variável de connection e importar connection.js
const router = require('express').Router();
const connection = require('./connection');
// Rotas para manipulação de todos

router.get('/todos', (req, res) => {
  // buscar todos no banco de dados
  connection.query('SELECT * FROM todos', (err, results) => { 
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results.rows);
    }
  });
  // res.send('Lista de todos');
});

router.put('/todos/:id', (req, res) => {
  // atualizar um todo
  const {id} = req.params;
  
  const {task, owner, status} = req.body;
  connection.query(
    'UPDATE todos SET task = $1, owner = $2, status = $3 WHERE todos_id = $4 returning *',
    [task, owner, status, id],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
  //res.send('Atualizar um todo');
});

router.post('/todos', (req, res) => {
  // criar um todo
  const {task, owner, status} = req.body
  connection.query("INSERT INTO todos (task, owner, status) VALUES ($1, $2, $3) returning *",
      [task, owner, status], (err, results) => {
        console.log(results)
        res.status(200).send(results.rows)
      })
});

router.delete('/todos/:id', (req, res) => {
  // Apagar um todo
  const { id } = req.params;
      connection.query(
        `DELETE FROM todos WHERE todos_id = $1 returning *`,
        [id],
        (err, results) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(results.rows);
          }
        }
      );
});

// lembre-se de exportar o router
module.exports = router;