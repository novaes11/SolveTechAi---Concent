const Logger = require('./logger');
const log = new Logger('app');

// Load environment variables from .env file, this allows us to keep sensitive information like database credentials out of our source code and easily manage different configurations for development, testing, and production environments.
require('dotenv').config();

log.info('Starting application...');

const db = require('../config/database');

async function testDBConnection(){
    const createPersonTableQuery = `
        CREATE TABLE IF NOT EXISTS person (
            id_person SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            biological_sex CHAR NOT NULL,
            date_of_birth DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `

    try{
        log.info('Testing database connection...');
        await db.query(createPersonTableQuery);
    } catch(error){
        log.error('Database connection failed' +  error.message);
        
    }
}   