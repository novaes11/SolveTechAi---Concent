let log = new Logger('app');

// Load environment variables from .env file, this allows us to keep sensitive information like database credentials out of our source code and easily manage different configurations for development, testing, and production environments.
require('dotenv').config();

// Importing the Logger class from the Logger.js file, this class is used to handle logging with different levels and colors, making it easier to track the application's behavior and debug issues.
const expess = require('express');

log.info('Starting application...');

const db = require('../config/database');

const 