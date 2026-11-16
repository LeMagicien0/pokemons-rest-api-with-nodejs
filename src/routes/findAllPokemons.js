const {Pokemon} = require('../db/sequilize');
const {Op} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons', auth, (req, res) => {
        
        if(req.query.name){ // dans le cas ou on passe un parametre de recherche name a notre ends point
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if(name.length < 2) {
                const message = `Le terme de la recherche doit contenir au moins 2 caracteres`
                return res.status(400).json({message})
            }

            return Pokemon.findAndCountAll({
                where: {
                    name: { // 'name' est la propriete du moele pokemon
                        [Op.like]: `%${name}%` // 'name' est le critere de la recherche
                    }
                },
                order: ['name'],
                limit: limit // donner une limite sur le nombre de resultat (5 dans notre cas)
            })
            .then(({count, rows}) => {
                const message = `Il y a ${count} pokemon qui correspondent au terme de recherche ${name}`
                res.json({message, data: rows})
            })
        }
        Pokemon.findAll({order: ['name']})
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.';
                res.json({ message, data: pokemons });
            })
            .catch(error => {
                const message = `La liste des pokemon n'a pas pu etre recupere. Reessyez dans quelques instants.`
                res.status(500).json({message, data: error})
            })
    });
};