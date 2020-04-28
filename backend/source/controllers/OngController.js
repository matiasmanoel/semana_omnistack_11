const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {

//O campo em que passamos '/ongs', como parte  final da rota "localhost:3333/ongs", é chamado de RECURSO, relacionado a uma entidade da aplicação provavelmente. 
/**
 * Tipos de parâmetros: 
 * 
 * Query Params: Parâmetros nomeados enviados nas rotas após o símbolo de '?', servem para filtros(filtragem de pesquisa), paginação, etc. (app.get('/users?name=Matias&idade=18&page=2') = req.query.
 * Route Params: Parâmetros usados para identificar recursos ('/ongs/:id') = req.params.
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos. 
 * 
 */
 /**
  * BANCO SQL => SQLite => Query Builder
  *   -  Driver: SELECT * FROM ongs
  *   -  Query Builder: table('ongs').select('*').where()...
  *        - KNEX.JS - é o nome da ferramente que será utilizada.
  */

    async index (req, res) {
        const ongs = await connection('ongs').select('*');
      
        return res.json(ongs);
    },

    async create(req, res) {
    // const data = req.body;
    //          OU ↓↓
    const {name, email, whatsapp, cidade, uf} = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id, 
      name,
      email,
      whatsapp, 
      cidade, 
      uf
    })
    
    return res.json({ id });
    }
}