require('dotenv').config({ path: '.env' });
const Logger = require('../core/logger');
const log = new Logger('backend/src/config/database.js');
const { dbPool } = require('./database');

const createPersonTableQuery = `
    CREATE TABLE IF NOT EXISTS person (
        id_person SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cpf VARCHAR(11) UNIQUE NOT NULL,
        biological_sex CHAR(1) NOT NULL,
        birth_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createLoginTableQuery = `
    CREATE TABLE IF NOT EXISTS login (
        id_login SERIAL PRIMARY KEY,
        id_person INT NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_person) REFERENCES person(id_person) ON DELETE CASCADE
    );
`;

const createPhoneTableQuery = `
    CREATE TABLE IF NOT EXISTS phone (
        id_phone SERIAL PRIMARY KEY,
        id_person INT NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_person) REFERENCES person(id_person) ON DELETE CASCADE
    );
`;

const createDoctorTableQuery = `
    CREATE TABLE IF NOT EXISTS doctor (
        id_person INT PRIMARY KEY,
        crm VARCHAR(10) UNIQUE NOT NULL,
        crm_uf VARCHAR(2) NOT NULL,
        speciality VARCHAR(255) NOT NULL,
        FOREIGN KEY (id_person) REFERENCES person(id_person) ON DELETE CASCADE
    );
`;

const createPatientTableQuery = `
    CREATE TABLE IF NOT EXISTS patient (
        id_person INT PRIMARY KEY,
        blood_type VARCHAR(3),
        allergies TEXT,
        FOREIGN KEY (id_person) REFERENCES person(id_person) ON DELETE CASCADE
    );
`;

const createAppointmentTableQuery = `
    CREATE TABLE IF NOT EXISTS appointment (
        id_appointment SERIAL PRIMARY KEY,
        id_patient INT NOT NULL,
        id_doctor INT NOT NULL,
        scheduled_at TIMESTAMP NOT NULL,
        status VARCHAR(50) DEFAULT 'SCHEDULED',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_patient) REFERENCES patient(id_person),
        FOREIGN KEY (id_doctor) REFERENCES doctor(id_person)
    );
`;

async function runInit() {
    try {
        log.info('Creating all tables...');
        await dbPool.query(createPersonTableQuery);
        log.info('Person table created successfully ✅');
        process.exit(0);

    } catch (error) {
        log.error(`Error creating person table: ${error.message}`);
        process.exit(1);
    }
}
runInit();