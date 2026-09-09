// Load environment variables from .env file, this allows us to keep sensitive information like database credentials out of our source code and easily manage different configurations for development, testing, and production environments.
const path = require('path');
// Usa path.resolve com __dirname para garantir que o .env seja encontrado
// independentemente do diretório a partir do qual o processo Node.js é iniciado.
// Sem isso, um caminho relativo como '.env' falharia ao executar de fora da pasta backend/.
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const Logger = require('./logger');
const { dbPool, testDBConnection } = require('../config/database');
const personRoutes = require('../routes/personRoute');
const appointmentRoutes = require('../routes/appointmentRoute');
const doctorRoutes = require('../routes/doctorRoute');
const patientRoutes = require('../routes/patientRoute');
const loginRoutes = require('../routes/loginRoute');
const phoneRoutes = require('../routes/phoneRoute');

const log = new Logger('backend/src/core/app.js');
const app = express();

app.use(express.json());
app.use('/api/persons', personRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/logins', loginRoutes);
app.use('/api/phones', phoneRoutes);

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
