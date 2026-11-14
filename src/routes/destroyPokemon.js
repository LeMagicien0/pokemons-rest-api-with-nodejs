const { Pokemon } = require('../db/sequilize');

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            const pokemonToDelete = req.params;
            Pokemon.destroy({
                where: { id: pokemonToDelete.id }
            }).then(() => {
                const message = `Le pokémon ${pokemonToDelete.name} a bien été supprimé.`;
                res.json({ message, data: pokemonToDelete });
            });
        });
    });
};