const Logger = require('../core/logger');
const log = new Logger('backend/src/controllers/phoneController.js');

const PhoneModel = require('../models/phoneModel');

const createPhone = async (req, res) => {
    // data received from frontend(client)
    log.debug(`Received POST request to create phone with body: ${JSON.stringify(req.body)}`);

    const { id_person, phone_number, is_primary } = req.body;

    // data validation - check if all required fields are present
    if (!id_person || !phone_number) {
        log.warning('Missing required fields in request body');
        return res.status(400).json({ error: 'Missing required fields: id_person, phone_number' });
    }

    try {
        log.debug(`Creating phone with id_person: ${id_person}, phone_number: ${phone_number}...`);
        const newPhone = await PhoneModel.createPhone(id_person, phone_number, is_primary);
        log.info(`Phone created successfully for person ID: ${id_person}`);
        return res.status(201).json(newPhone);
    } catch (error) {
        log.error(`Error creating phone: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createPhone
};
