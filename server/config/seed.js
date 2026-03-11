import { pool } from './database.js';

const createTableQuery = `
    DROP TABLE IF EXISTS plants;
    
    CREATE TABLE plants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        scientific_name VARCHAR(255) NOT NULL,
        difficulty VARCHAR(50) NOT NULL,
        watering VARCHAR(255) NOT NULL,
        image TEXT NOT NULL
    );
`;

const insertPlantsQuery = `
    INSERT INTO plants (name, scientific_name, difficulty, watering, image)
    VALUES 
        ('Monstera', 'Monstera deliciosa', 'Medium', 'Every 1-2 weeks', '/images/monstera.jpg'),
        ('Snake Plant', 'Sansevieria trifasciata', 'Easy', 'Every 2-3 weeks', '/images/snake-plant.jpg'),
        ('ZZ Plant', 'Zamioculcas zamiifolia', 'Easy', 'Every 2-3 weeks', '/images/zz-plant.jpg'),
        ('Fiddle Leaf Fig', 'Ficus lyrata', 'Hard', 'Once a week', '/images/fiddle-leaf-fig.jpg'),
        ('Golden Pothos', 'Epipremnum aureum', 'Easy', 'Every 1-2 weeks', '/images/golden-pothos.jpg');
`;

async function seedDatabase() {
    try {
        console.log('🌱 Connecting to database...');
        
        // 1. Create the table
        await pool.query(createTableQuery);
        console.log('✅ Created plants table successfully.');

        // 2. Insert the data
        await pool.query(insertPlantsQuery);
        console.log('✅ Seeded database with plant data.');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        // Close the connection when done
        pool.end(); 
    }
}

seedDatabase();