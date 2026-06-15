// let { dbPool } = require('../config/database');
let Logger = require('../core/logger');
let log = new Logger('backend/src/models/personModel.js');

const personModel = {
    createPerson: async (name, biological_sex, date_of_birth) => {
        log.info('Creating person...');
        log.debug(`Received paramters: name=${name}, biological_sex=${biological_sex}, date_of_birth=${date_of_birth}`);
        const query = `
            INSERT INTO person (
                name, biological_sex, date_of_birth
            ) VALUES ($1, $2, $3)
             RETURNING *
             `;
        
        const values = [name, biological_sex, date_of_birth];

        try {
            log.debug(`Executing query: ${query} with values: ${values}`);
            const res = await dbPool.query(query, values);
            log.info('Person created successfully!');
            return res.rows[0];
        } catch (error) {
            log.error(`Error creating person: ${error.message}`); 
            throw error;
        }
    }
}
module.exports = personModel;