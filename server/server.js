import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// 1. IMPORT YOUR DATABASE CONNECTION
import { pool } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/public')));

// 2. ROUTE: Get all plants from PostgreSQL
app.get('/api/plants', async (req, res) => {
    try {
        // Query the database to get all rows
        const result = await pool.query('SELECT * FROM plants ORDER BY id ASC');
        
        // Send the database rows directly to the frontend
        res.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
});

// 3. ROUTE: Detail View (Dynamic Endpoint)
app.get('/plants/:plantId', (req, res) => {
    // We just serve the HTML page here. The frontend JavaScript will 
    // fetch the specific plant data using the API route above!
    res.sendFile(path.join(__dirname, '../client/public', 'plant.html'));
});

// 4. Catch-all 404 Route
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../client/public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`🌱 Server is buzzing at http://localhost:${PORT}`);
});