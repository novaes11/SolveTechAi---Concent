const Logger = require('./logger');
const log = new Logger('backend/src/core/app.js');

// Load environment variables from .env file, this allows us to keep sensitive information like database credentials out of our source code and easily manage different configurations for development, testing, and production environments.
require('dotenv').config({ path: '.env' });

log.info('Starting application...');

const db = require('../config/database');