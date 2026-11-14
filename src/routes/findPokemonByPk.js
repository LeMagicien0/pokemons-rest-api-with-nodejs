const { Pokemon } = require('../db/sequilize');

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if (!pokemon) {
                    const message = 'Le pokémon demandé n\'existe pas.';
                    return res.status(404).json({ message });
                }
                const message = 'Le pokémon a bien été récupéré.';
                res.json({ message, data: pokemon });
            })
    });
};
