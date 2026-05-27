const Logger  = require('../core/logger')
const log = new Logger('backend/src/config/database.js');
// this is called Destructuring assignment in JavaScript, it allows us to extract properties from an object and assign them to variables. In this case, we are extracting the Pool class from the 'pg' library and assigning it to a variable named Pool.
const { Pool } = require('pg');
try{
    const dbPool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,      
    })

    // Singleton method to ensure that only one instance of the database connection pool is created and shared across the application. This helps to manage resources efficiently and avoid unnecessary connections to the database. By exporting the dbPool instance, other parts of the application can import and use it to interact with the database without needing to create multiple instances of the connection pool.
    module.exports = dbPool;
    
    log.info('Database connection pool created successfuly ✅');
}catch(error){
    log.error(error)
}