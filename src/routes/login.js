const {User} = require('../db/sequilize');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');  
const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        const {username, password} = req.body

        User.findOne({ where: { username } })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }

                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(401).json({ message: 'Invalid credentials' }); // le mot de passe est incorrect
                        }
                        // JWT token generation
                        const token = jwt.sign(
                            { id: user.id, username: user.username },
                            privateKey,
                            { expiresIn: '24h' }
                        );

                        const message = `L'utilisateur ${user.username} est connecté.`
                        res.json({ message, data: user, token });
                    });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    });
};