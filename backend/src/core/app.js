const Logger = require('./logger');
const log = new Logger('backend/src/core/app.js');

// Load environment variables from .env file, this allows us to keep sensitive information like database credentials out of our source code and easily manage different configurations for development, testing, and production environments.
require('dotenv').config({ path: '.env' });

log.info('Starting application...');

const db = require('../config/database');

const createPersonTableQuery = `
        CREATE TABLE IF NOT EXISTS person (
            id_person SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            biological_sex CHAR NOT NULL,
            date_of_birth DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `
testDBConnection();

async function testDBConnection(retries = 5, delay = 2000) {
    log.info('Testing database connection...');
    
    for (let i = 0; i < retries; i++) {
        try{
            await db.query(createPersonTableQuery); 
            log.info('Database connection pool working correctly ✅');
            return true;

        } catch(error){
            if (i < retries - 1) {
                log.warning(`Database connection failed (Attempt ${i + 1}/${retries}). Try again in ${delay} ms. Error: ${error.message}`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                log.error(`Database connection failed after ${retries} attempts. Error: ${error.message}`);
                return false;
            }
        }
    }
}   