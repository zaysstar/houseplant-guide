import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Setup for static files (so we can serve HTML/CSS later)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// 1. Our Data: The Houseplant Care Guide
const plants = [
    {
        id: "monstera",
        name: "Monstera",
        scientificName: "Monstera deliciosa",
        difficulty: "Medium",
        watering: "Every 1-2 weeks",
        image: "https://plantersplace.com/wp-content/uploads/2022/08/20200309_110255-scaled.jpg"
    },
    {
        id: "snake-plant",
        name: "Snake Plant",
        scientificName: "Sansevieria trifasciata",
        difficulty: "Easy",
        watering: "Every 2-3 weeks",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg"
    },
    {
        id: "zz-plant",
        name: "ZZ Plant",
        scientificName: "Zamioculcas zamiifolia",
        difficulty: "Easy",
        watering: "Every 2-3 weeks",
        image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: "fiddle-leaf-fig",
        name: "Fiddle Leaf Fig",
        scientificName: "Ficus lyrata",
        difficulty: "Hard",
        watering: "Once a week",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtvZi9ApK1wIl-FlRCHFBOgswwy55iDO3WmDoQIuC_VaHvZAn-8XT2VA2jkbRwqYjNBBwcdzhroTkCaPV8j6DQ1bnHne97O-CQyS2Hog&s=10"
    },
    {
        id: "pothos",
        name: "Golden Pothos",
        scientificName: "Epipremnum aureum",
        difficulty: "Easy",
        watering: "Every 1-2 weeks",
        image: "https://costafarms.com/cdn/shop/files/UpdatedD2CPhotography-04452--cream_2048x2048.jpg?v=1694797196"
    }
];

// 2. Route: Main List Data
// Your frontend will fetch this to display the list
app.get('/api/plants', (req, res) => {
    res.json(plants);
});

// 3. Route: Detail View (Dynamic Endpoint)
app.get('/plants/:plantId', (req, res) => {
    const plant = plants.find(p => p.id === req.params.plantId);
    
    if (plant) {
        // Pointing to your new plant.html file
        res.sendFile(path.join(__dirname, 'public', 'plant.html'));
    } else {
        res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
});

// 4. Catch-all 404 Route
app.use((req, res) => {
    // If a user types a random URL, send the 404.html file
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`🌱 Server is buzzing at http://localhost:${PORT}`);
});