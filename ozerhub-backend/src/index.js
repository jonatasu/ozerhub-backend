const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Usar rotas de usuário
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to OZERhub!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});