require('dotenv').config({ path: '.env' });
const Logger = require('../core/logger');
const log = new Logger('backend/src/config/database.js');
const {dbPool} = require('./database');

const createPersonTableQuery = `
        CREATE TABLE IF NOT EXISTS person (
            id_person SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            cpf VARCHAR(11) UNIQUE NOT NULL,
            biological_sex CHAR(1) NOT NULL,
            birth_date DATE NOT NULL
        );
    `;
    
const createLoginTableQuery = `
        CREATE TABLE IF NOT EXISTS login (
            id_login SERIAL PRIMARY KEY,
            email VACHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            situation BOOLEAN NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_person) REFERENCES person(id_person)
        )`;

const createPhoneTableQuery = `
        CREATE TABLE IF NOT EXISTS phone (
            id_phone SERIAL PRIMARY KEY,
            phone VARCHAR(10) NOT NULL,
            DDD_phone VARCHAR(2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

const createOwnsRelationTableQuery = `
        CREATE TABLE IF NOT EXISTS owns_relation (
            FOREING KEY (id_person) REFERENCES person(id_person),
            FOREING KEY (id_phone) REFERENCES phone(id_phone)
        )    
`;

const createDoctorTableQuery = `
        CREATE TABLE IF NOT EXISTS doctor (
            id_person INT PRIMARY KEY REFERENCES person(id_person) ON DELETE CASCADE,
            crm VARCHAR(10) NOT NULL,
            crm_uf VARCHAR(2) NOT NULL,
            speciality VARCHAR(255) NOT NULL,
            FOREIGN KEY (id_person) REFERENCES person(id_person)
        )
    `;

const createPatientTableQuery = `
        CREATE TABLE IF NOT EXISTS PATIENT (
            id_person INT PRIMARY KEY REFERENCES PERSON(id_person) ON DELETE CASCADE,
            blood_type VARCHAR(3) NOT NULL,
            allergies VARCHAR(255) NOT NULL
`;

const createAppointmentTableQuery = ``;

async function runInit(){
    try {
        log.info('Creating all tables...');
        await dbPool.query(createPersonTableQuery);
        log.info('Person table created successfully ✅');
        process.exit(0);

    } catch(error){
        log.error(`Error creating person table: ${error.message}`);
        process.exit(1);
    }
}
runInit();