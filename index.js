const server = require('./server.js');

const PORT = process.env.PORT || 4000;


const accountsRouter = require('./accounts-router.js');

server.use('/api/accounts', accountsRouter); 



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});