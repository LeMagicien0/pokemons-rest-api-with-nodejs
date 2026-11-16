const { Sequelize } = require('sequelize');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon');
const bcrypt = require('bcrypt');

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
const User = UserModel(sequelize, Sequelize.DataTypes)

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

        const saltRounds = 10
        bcrypt.hash('pikachu', saltRounds)
        .then(hash => User.create({username: 'pikachu', password: hash}))
        .then(user => console.log(user.toJSON()))

        console.log('Database has been initialized successfully.');
    }) 
}

module.exports = {
    initDb, Pokemon, User
}