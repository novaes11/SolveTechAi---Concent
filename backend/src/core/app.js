// Load environment variables from .env file, this allows us to keep sensitive information like database credentials out of our source code and easily manage different configurations for development, testing, and production environments.
require('dotenv').config({ path: '.env' });

const express = require('express');
const Logger = require('./logger');
const { dbPool, testDBConnection } = require('../config/database');
const personRoutes = require('../routes/personRoute');
const appointmentRoutes = require('../routes/appointmentRoute');

const log = new Logger('backend/src/core/app.js');
const app = express();

app.use(express.json());
app.use('/api/persons', personRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    log.info('Starting application...');
    await testDBConnection();
    
    app.listen(PORT, () => {
        log.info(`Server is running on port ${PORT}`);
    });
    
    log.info('Application started successfully. Moving to next steps...');
}

bootstrap();
