const express = require('express'); 

const knex = require('./data/dbConfig'); 

const router = express.Router(); 

const validateId = (req, res, next) => {
    knex('accounts').where('id', '=', `${req.params.id}`)
    .then( accounts => {
        if(accounts[0])
        {
            req.body = accounts[0]; 
            next()
        }else{
            res.status(404).json({message: 'invalid id'})
        }
    }
    ).catch(error => res.status(400).json(error))
}
/***********GET************/
//get all
router.get('/', (req, res) => {
    knex.select('*').from('accounts')
    .then(accounts => res.status(200).json(accounts))
    .catch(error => res.status(500).json({message: 'error!! error!! error!!'}));
  }); 

router.get('/:id', validateId, (req, res) => {
    knex("accounts").where('id', '=', `${req.params.id}`)
    .then(account => res.status(200).json(req.body))
    .catch(error => res.status(400).json(error))
})
  
  
  /***********POST************/
  router.post('/', (req, res) => {
    knex('accounts').insert(req.body).
    then(accounts => res.status(202).json(accounts))
    .catch(error => res.status(400).json(error))
  })
  
  /***********PUT************/
  
  router.put('/:id', (req, res) => {
    knex('accounts').where('id', '=', `${req.params.id}`).update({...req.body})
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
  })
  
  /***********DELETE************/
  
  router.delete('/:id', validateId, (req, res) => {
    knex('accounts').where('id', '=', `${req.params.id}`).delete()
    .then(accounts => res.status(200).json(accounts))
    .catch(error => res.status(400).json(error))
  })


module.exports = router; 