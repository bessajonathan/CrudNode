const express = require('express');

const server = express();

server.use(express.json());

//http://localhost:3000

server.listen(3000);


//Middlewares

function checkUserExists(req,res,next){
  if(!req.body.name){
    return res.status(400).json({error: 'Nome de Usuário é obrigatório'});
  }

  return next();
};

function checkUserInArray(req,res,next){

  const user = users[req.params.index];
  if(!user){
    return res.status(400).json({error: 'Usuário não existe'});
  }

  req.user = user;

  return next();
};

//Criação de Array para adicionar usuários;

const users = ['Diego','Claudio','Victor'];

//Cadastra novo usuário

server.post('/users',checkUserExists,(req,res) =>{
  const { name } = req.body;

  users.push(name);
  return res.json(users);
});

//Retorna todos usuários

server.get('/users',(req,res) =>{
  return res.json(users);
});

//Retorna usuário específico

server.get('/users/:index',checkUserInArray,(req,res) => {
  return res.json(req.user);
});

//Atualiza Usuários

server.put('/users/:index',checkUserExists,(req,res) =>{
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


