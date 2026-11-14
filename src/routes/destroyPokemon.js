const { Pokemon } = require('../db/sequilize');

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                const message = `Le pokemon donnee n'existe pas. Reessayez acvec un autre identifiant`
                res.status(404).json(message)
            }
            const pokemonToDelete = req.params;
            return Pokemon.destroy({
                where: { id: pokemonToDelete.id }
            }).then(() => {
                const message = `Le pokémon ${pokemonToDelete.name} a bien été supprimé.`;
                res.json({ message, data: pokemonToDelete });
            })
        })
        .catch(error => {
            const message = `Le pokemon n'a pas pu etre suprime. Reessayez dans quelques instant`
            res.status(500).json({message, data: error})
        })
    })
}