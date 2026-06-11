// Load environment variables from .env file, this allows us to keep sensitive information like database credentials out of our source code and easily manage different configurations for development, testing, and production environments.
require('dotenv').config({ path: '.env' });

const Logger = require('./logger');
const log = new Logger('backend/src/core/app.js');

log.info('Starting application...');

const { dbPool, testDBConnection} = require('../config/database');

async function bootstrap(){
    log.info('Starting aplication...')

    await testDBConnection();

    log.info('Application started successfully. Moving to next steps...');
}

bootstrap();