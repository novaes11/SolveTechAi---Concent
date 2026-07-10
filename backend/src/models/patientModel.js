const { dbPool } = require('../config/database');
const Logger = require('../core/logger');
const log = new Logger('backend/src/models/patientModel.js');

const patientModel = {
    createPatient: async (id_person, blood_type, allergies) => {
        log.info('Creating patient...');
        log.debug(`Received parameters: id_person=${id_person}, blood_type=${blood_type}, allergies=${allergies}`);
        const query = `
            INSERT INTO patient (
                id_person, blood_type, allergies
            ) VALUES ($1, $2, $3)
             RETURNING id_person
             `;

        const values = [id_person, blood_type, allergies];

        try {
            log.debug(`Executing query: ${query} with values: ${values}`);
            const res = await dbPool.query(query, values);
            if (res.rows.length === 0) {
                throw log.error(`Error inserting patient for person ${id_person}`, 'createPatient');
            }
            log.info('Patient created successfully!');
            return res.rows[0];
        } catch (error) {
            log.error(`Error creating patient: ${error.message}`);
            throw error;
        }
    }
}
module.exports = patientModel;
