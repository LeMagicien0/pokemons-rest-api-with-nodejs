const {Pokemon} = require('../db/sequilize');

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = 'Le pokémon a bien été créé.';
                res.status(201).json({ message, data: pokemon });
            })
    });
};
