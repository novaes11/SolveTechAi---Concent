const Database = require('better-sqlite3');

// Cria ou abre o banco de dados 'Lab.db'
const db = new Database('dataBase/Lab.db');

// Cria a tabela 'users' se ela não existir
const createPersonSQL = `
    CREATE TABLE IF NOT EXISTS person(
        id_person INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(200) NOT NULL,
        cpf INTEGER NOT NULL UNIQUE,
        biological_sex VARCHAR(1) NOT NULL,
        birth_date DATE NOT NULL,
    )
`
db.exec(createPersonSQL);

const createLoginSQL = `
    CREATE TABLE IF NOT EXISTS login(
        id_login INTEGER PRIMARY KEY AUTOINCREMENT,
        id_person INTEGER NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        password_hash INTEGER NOT 
        CONSTRAINT fk_id_person FOREIGN KEY (id_person) REFERENCES person(id_person)
    )
`
db.exec(createLoginSQL);

const createPhoneSQL = `
    CREATE TABLE IF NOT EXISTS phone(
        id_phone INTEGER PRIMARY KEY AUTOINCREMENT,
        id_person INTEGER NOT NULL,
        phone INTEGER NOT NULL,
        DDD INTEGER NOT NULL,
        CONSTRAINT fk_id_person FOREIGN KEY (id_person) REFERENCES person(id_person)
    )
`

db.exec(createPhoneSQL);

const createPacientSQL = `
    CREATE TABLE IF NOT EXISTS pacient(
        id_pacient INTEGER PRIMARY KEY AUTOINCREMENT,
        id_person INTEGER NOT NULL,
        CONSTRAINT fk_id_person FOREIGN KEY (id_person) REFERENCES person(id_person)
    )
`