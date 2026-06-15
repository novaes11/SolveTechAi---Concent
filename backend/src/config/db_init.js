require('dotenv').config({ path: '.env' });
const Logger = require('../core/logger');
const log = new Logger('backend/src/config/database.js');
const {dbPool} = require('./database');

const createPersonTableQuery = `
        CREATE TABLE IF NOT EXISTS person (
            id_person SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            biological_sex CHAR(1) NOT NULL,
            date_of_birth DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;


async function runInit(){
    try {
        log.info('Creating person table...');
        await dbPool.query(createPersonTableQuery);
        log.info('Person table created successfully ✅');
        process.exit(0);

    } catch(error){
        log.error(`Error creating person table: ${error.message}`);
        process.exit(1);
    }
}
runInit();