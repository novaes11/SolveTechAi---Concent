const { dbPool } = require('../config/database');
const Logger = require('../core/logger');
const log = new Logger('backend/src/models/phoneModel.js');

const phoneModel = {
    createPhone: async (id_person, phone_number, is_primary = false) => {
        log.info('Creating phone...');
        log.debug(`Received parameters: id_person=${id_person}, phone_number=${phone_number}, is_primary=${is_primary}`);
        const query = `
            INSERT INTO phone (
                id_person, phone_number, is_primary
            ) VALUES ($1, $2, $3)
             RETURNING id_phone
             `;

        const values = [id_person, phone_number, is_primary];

        try {
            log.debug(`Executing query: ${query} with values: ${values}`);
            const res = await dbPool.query(query, values);
            if (res.rows.length === 0) {
                throw log.error(`Error inserting phone for person ${id_person}`, 'createPhone');
            }
            log.info('Phone created successfully!');
            return res.rows[0];
        } catch (error) {
            log.error(`Error creating phone: ${error.message}`);
            throw error;
        }
    }
}
module.exports = phoneModel;
