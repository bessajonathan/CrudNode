const express = require('express');

const server = express();

server.use(express.json());

//http://localhost:3000

server.listen(3000);

const users = ['Diego','Claudio','Victor'];

//Cadastra novo usuário

server.post('/users',(req,res) =>{
  const { name } = req.body;

  users.push(name);
  return res.json(users);
});

//Retorna todos usuários

server.get('/users',(req,res) =>{
  return res.json(users);
});

//Retorna usuário específico

server.get('/users/:index',(req,res) => {
  const index = req.params.index;

  return res.json(users[index]);
});

//Atualiza Usuários

server.put('/users/:index',(req,res) =>{
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//Deleta Usuários

server.delete('/users/:index',(req,res) =>{
  const { index } = req.params;

  users.splice(index,1);
  return res.send();
});


