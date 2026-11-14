const pokemons = require("./mock-pokemon")

exports.success = (message, data) => {
    return {
        message: message,
        data: data
    }
}

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(p => p.id)
    if (pokemonsIds.length >= 2 ) return pokemonsIds.reduce((a, b) => Math.max(a, b)) + 1
    return 1

}
 