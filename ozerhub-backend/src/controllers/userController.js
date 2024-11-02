const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('../models/user');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validações simples (melhorar posteriormente)
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Criptografar a senha
        const passwordHash = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Criar usuário no banco de dados
        const user = await createUser({ username, email, passwordHash });
        console.log('User created:', user);

        // Gerar token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { registerUser };