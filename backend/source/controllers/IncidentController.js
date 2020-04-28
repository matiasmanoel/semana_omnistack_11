const connection = require('../database/connection');

// Ctrl + D -  duplica campo a ser editado na linha.

module.exports = {

    async index(req, res){
        const { page = 1 } = req.query;

        //como espera apenas 1 result, e isso ↓↓ retorna um array, para a primeira posição do array, pode-se colocar colchetes em volta, ou CLARO fazer o retorno  de count[0];
        const [count] = await connection('incidents').count();
        // console.log(count);
        
        // ver + sobre paginação, em  01:25min da aula 02.
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1)  * 5)
        .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.cidade', 
        'ongs.uf'
        ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    async create(req, res)  {
        const { titulo, descricao, value} = req.body;
        const ong_id = req.headers.authorization;

        // DESESTRUTURAÇÃO
        // Ou "const result = await connec..."
        // ...
        // descricao,
        // ...
        // ...
        // });
        // const  id = result[0];

        const [id] = await connection('incidents').insert({
            titulo,
            descricao,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async delete(req, res){
        const{ id } =  req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            if(incident.ong_id != ong_id){
                return res.status(401).json({ error: 'Operation not permitted. '});
            }

            await connection('incidents').where('id', id).delete();
            
            return res.status(204).send();
    }
}