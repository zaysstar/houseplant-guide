import pg from 'pg';
import dotenv from 'dotenv';

// Load variables from the .env file
dotenv.config();

const config = {
    connectionString: process.env.DATABASE_URL,
};

// Create a connection pool to talk to the database
export const pool = new pg.Pool(config);