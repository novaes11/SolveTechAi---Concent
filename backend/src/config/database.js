const Logger  = require('../core/logger')
const log = new Logger('backend/src/config/database.js');
// this is called Destructuring assignment in JavaScript, it allows us to extract properties from an object and assign them to variables. In this case, we are extracting the Pool class from the 'pg' library and assigning it to a variable named Pool.
const { Pool } = require('pg');

log.debug(`Initializing database conection pool for @${process.env.DB_USER} with '${process.env.DB_HOST}:${process.env.DB_PORT}' (database: ${process.env.DB_NAME})...`);
const dbPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,      
})

// Singleton method to ensure that only one instance of the database connection pool is created and shared across the application. This helps to manage resources efficiently and avoid unnecessary connections to the database. By exporting the dbPool instance, other parts of the application can import and use it to interact with the database without needing to create multiple instances of the connection pool.

async function testDBConnection(retries = 5, delay = 2000) {
    log.info('Testing database connection...');
    
    for (let i = 0; i < retries; i++) {
        try{
            log.debug(`Initializing database connection pool with '${process.env.DB_HOST}:${process.env.DB_PORT}' (database: ${process.env.DB_NAME})...`);
            await dbPool.query('SELECT 1'); // Simple query to test the connection
            log.info('Database connection pool working correctly ✅');
            return true;

        } catch(error){
            if (i < retries - 1) {
                log.warning(`Database connection failed (Attempt ${i + 1}/${retries}). Try again in ${delay} ms. Error: ${error.message}`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                log.error(`Database connection failed after ${retries} attempts. Error: ${error.message}`);
                process.exit(1); // Exit the application if the database connection fails after all retries
            }
        }
    }
}  

module.exports = {
    dbPool,
    testDBConnection
}