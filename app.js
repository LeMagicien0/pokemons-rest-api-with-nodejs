const express = require('express');
const {success, getUniqueId} = require('./helper');
let pokemons = require('./mock-pokemon');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { create } = require('node:domain');
const bodyParser = require('body-parser');
const {Sequelize, DataTypes} = require('sequelize');
const { time } = require('node:console');
const pokemonModel = require('.//src/models/pokemon');

const app = express();
const port = 3000

const sequelize = new Sequelize(
    'pokedex', // username
    'root', // password
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions : {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

// verify the connection to the database
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

const Pokemon = pokemonModel(sequelize, DataTypes)


sequelize.sync({force: true})
    .then(_ => {
        console.log('Pokemon table has been created successfully.'), 

        pokemons.map(pokemon => {
             Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp, 
            cp: pokemon.cp, 
            picture: pokemon.picture, 
            types: pokemon.types.join(',')
        }).then(pikachu => console.log(pikachu.toJSON()))
    })
})

app
    .use(morgan('dev')) // middleware pour logger les requêtes HTTP
    .use(favicon(__dirname + '/favicon.ico')) // middleware pour servir le favicon
    .use(bodyParser.json()) // middleware pour parser le corps des requêtes en JSON

app.get('/', (req, res) => res.send('Hello express 3!'));

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);
    const message = 'Un pokémon a été trouvé.';
    res.json(success(message, pokemon));
});

app.get('/api/pokemons', (req, res) => {
    const msg = `La liste des ${pokemons.length} pokémons a été récupérée avec succès.`;
    res.json(success(msg, pokemons));
    //res.send(`le nombre total de pokemon est ${pokemons.length}`);
});

app.post('/api/pokemons', (req, res) =>{
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `pokemon ${pokemonCreated.name} created successfuly`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = {...req.body, id: id}
    pokemons = pokemons.map(p => p.id === id ? pokemonUpdated : p)
    const message = `pokemon ${pokemonUpdated.name} updated successfuly`
    res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(p => p.id === id)
    pokemons = pokemons.filter(p => p.id !== id)
    const message = `pokemon ${pokemonDeleted.name} deleted successfuly`
    res.json(success(message, pokemonDeleted))
})



app.listen(port, () => console.log(`App listening on port ${port}! and the path is: http://localhost:${port}`));  