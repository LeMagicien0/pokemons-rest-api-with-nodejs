const { Sequelize } = require('sequelize');
const PokemonModel = require('../models/pokemon');
const pokemons = require('./mock-pokemon');

const sequelize = new Sequelize(
    'pokedex', // database name
    'root', // username
    '', // password
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions : {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

const Pokemon = PokemonModel(sequelize, Sequelize.DataTypes)

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        })
        console.log('Database has been initialized successfully.');
    }) 
}

module.exports = {
    initDb, Pokemon
}