const { dbPool } = require('../config/database');
const Logger = require('../core/logger');
const log = new Logger('backend/src/models/loginModel.js');

const loginModel = {
    createLogin: async (id_person, email, password_hash) => {
        log.info('Creating login...');
        log.debug(`Received parameters: id_person=${id_person}, email=${email}`);
        const query = `
            INSERT INTO login (
                id_person, email, password_hash
            ) VALUES ($1, $2, $3)
             RETURNING id_login
             `;

        const values = [id_person, email, password_hash];

        try {
            log.debug(`Executing query: ${query} with values: ${values}`);
            const res = await dbPool.query(query, values);
            if (res.rows.length === 0) {
                throw log.error(`Error inserting login for person ${id_person}`, 'createLogin');
            }
            log.info('Login created successfully!');
            return res.rows[0];
        } catch (error) {
            log.error(`Error creating login: ${error.message}`);
            throw error;
        }
    }
}
module.exports = loginModel;
