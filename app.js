const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequilize');

const app = express();
const port = 3000



app
    .use(morgan('dev')) // middleware pour logger les requêtes HTTP
    .use(favicon(__dirname + '/favicon.ico')) // middleware pour servir le favicon
    .use(bodyParser.json()) // middleware pour parser le corps des requêtes en JSON

sequelize.initDb() // initialisation de la base de données

// here we will add all the end points for our API
require('./src/routes/findAllPokemons')(app); // endpoint pour récupérer tous les pokémons
require('./src/routes/findPokemonByPk')(app); // endpoint pour récupérer un pokémon par son id
require('./src/routes/createPokemon')(app); // endpoint pour créer un nouveau pokémon
require('./src/routes/updatePokemon')(app); // endpoint pour mettre à jour un pokémon existant
require('./src/routes/destroyPokemon')(app); // endpoint pour supprimer un pokémon existant

app.listen(port, () => console.log(`App listening on port ${port}! and the path is: http://localhost:${port}`));  