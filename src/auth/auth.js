// Middelware to verify the JWT token in the request header
const jwt = require('jsonwebtoken');
const privateKey = require('./private_key');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: `Vous n'avez pas fourni de jeton d'authentification. Ajouter un dans l'en-tête de la requête` });
    }  

    const token = authorizationHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    const decodedToken = jwt.verify(token, privateKey); // Verify the token using the private key

    if (!decodedToken) {
        return res.status(401).json({ message: 'Jeton d\'authentification invalide' });
    }
    req.user = decodedToken;
    next();

};
