const Logger = require('../core/logger');
const log = new Logger('backend/src/controllers/personController.js');

const PersonModel = require('../models/personModel');

const createPerson = async (req, res) => {
    // data received from frontend(client)
    log.debug(`Received POST request to create person with body: ${JSON.stringify(req.body)}`);

    const { name, cpf, biological_sex, date_of_birth } = req.body;

    // data validation - check if all required fields are present
    if (!name || !cpf || !biological_sex || !date_of_birth) {
        log.warning('Missing required fields in request body');
        return res.status(400).json({ error: 'Missing required fields: name, cpf, biological_sex, date_of_birth' });
    }

    // data validation - check if biological_sex if valid (M or F)
    if (biological_sex.length !== 1 || !['M', 'F'].includes(biological_sex.toUpperCase())) {
        log.warning(`Invalid biological_sex value. It must be 'M' or 'F'. Received: ${biological_sex}`);
        return res.status(400).json({ error: 'Invalid biological_sex value. It must be "M" or "F".' });
    }

    const birthDate = new Date(date_of_birth);
    const today = new Date();

    // data validation - check if date_of_birth is a valid date in the past
    if (isNaN(birthDate.getTime()) || birthDate >= today) {
        log.warning(`Invalid date_of_birth value. It must be a valid date in the past. Received: ${date_of_birth}`);
        return res.status(400).json({ error: 'Invalid date_of_birth value. It must be a valid date in the past.' });
    }


    try {
        log.debug(`Creating person with name: ${name}, cpf: ${cpf}, biological_sex: ${biological_sex}, date_of_birth: ${date_of_birth}...`);
        const newPerson = await PersonModel.createPerson(name, cpf, biological_sex, date_of_birth);
        log.info(`Person created successfully with ID: ${newPerson.id_person || newPerson.id}`);
        return res.status(201).json(newPerson);
    } catch (error) {
        log.error(`Error creating person: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createPerson
};