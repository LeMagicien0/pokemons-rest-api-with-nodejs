const {Pokemon} = require('../db/sequilize');

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id;
        Pokemon.update(req.body, {
            where: { id: id }
        })
        .then(() => {
            return Pokemon.findByPk(id).then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokemon donnee n'existe pas. Reessayez acvec un autre identifiant`
                    res.status(404).json(message)
                }
                const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
                res.json({ message, data: pokemon });
            })
        })
        .catch(error => {
            const message = `Le pokemon n'a pas pu etre recupere. Reessayez dans quelques instant`
            res.status(500).json({message, data: error})
        })
    })
};