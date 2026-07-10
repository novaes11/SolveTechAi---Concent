const { dbPool } = require('../config/database');
const Logger = require('../core/logger');
const log = new Logger('backend/src/models/personModel.js');

const personModel = {
    createPerson: async (name, cpf, biological_sex, birth_date) => {
        log.info('Creating person...');
        log.debug(`Received paramters: name=${name}, cpf=${cpf}, biological_sex=${biological_sex}, birth_date=${birth_date}`);
        const query = `
            INSERT INTO person (
                name, cpf, biological_sex, birth_date
            ) VALUES ($1, $2, $3, $4) ON CONFLICT (cpf) DO NOTHING
             RETURNING id_person
             `;

        const values = [name, cpf, biological_sex, birth_date];

        try {
            log.debug(`Executing query: ${query} with values: ${values}`);
            const res = await dbPool.query(query, values);
            if (res.rows.length === 0) {
                throw log.error(`Person with cpf ${cpf} already exists`, 'createPerson');
            }
            log.info('Person created successfully!');
            return res.rows[0];
        } catch (error) {
            log.error(`Error creating person: ${error.message}`);
            throw error;
        }
    }
}
module.exports = personModel;