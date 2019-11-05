const server = require('./server.js');

const PORT = process.env.PORT || 4000;

const knex = require('./data/dbConfig.js'); 

/***********GET************/
server.get('/api/posts', (req, res) => {
  knex.select('*').from('accounts')
  .then(accounts => res.status(200).json(accounts))
  .catch(error => res.status(500).json({message: 'error!! error!! error!!'}));
})


/***********POST************/
server.post('/api/posts', (req, res) => {
  knex('accounts').insert(req.body).
  then(accounts => res.status(202).json(accounts))
  .catch(error => res.status(400).json(error))
})

server.put('/api/posts/:id', (req, res) => {
  knex('accounts').where('id', '=', `${req.params.id}`).update({...req.body})
  .then(r => res.status(200).json(r))
  .catch(error => res.status(400).json(error))
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});