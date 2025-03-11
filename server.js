const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Configuration de la base de données
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'business',
    waitForConnections: true
});

// Servir les fichiers HTML statiques
app.use(express.static(path.join(__dirname, '')));

// Route pour les clients
app.get('/customers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM customers');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour les fournisseurs
app.get('/suppliers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM suppliers');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Démarrer le serveur
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});