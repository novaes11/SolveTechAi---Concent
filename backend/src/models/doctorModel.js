const { dbPool } = require('../config/database');
const Logger = require('../core/logger');
const log = new Logger('backend/src/models/doctorModel.js');

const doctorModel = {
    createDoctor: async (id_person, crm, crm_uf, speciality) => {
        log.info('Creating doctor...');
        log.debug(`Received parameters: id_person=${id_person}, crm=${crm}, crm_uf=${crm_uf}, speciality=${speciality}`);
        const query = `
            INSERT INTO doctor (
                id_person, crm, crm_uf, speciality
            ) VALUES ($1, $2, $3, $4)
             RETURNING id_person
             `;

        const values = [id_person, crm, crm_uf, speciality];

        try {
            log.debug(`Executing query: ${query} with values: ${values}`);
            const res = await dbPool.query(query, values);
            if (res.rows.length === 0) {
                throw log.error(`Error inserting doctor for person ${id_person}`, 'createDoctor');
            }
            log.info('Doctor created successfully!');
            return res.rows[0];
        } catch (error) {
            log.error(`Error creating doctor: ${error.message}`);
            throw error;
        }
    }
}
module.exports = doctorModel;
