const Logger = require('../core/logger');
const log = new Logger('backend/src/controllers/patientController.js');

const PatientModel = require('../models/patientModel');

const createPatient = async (req, res) => {
    // data received from frontend(client)
    log.debug(`Received POST request to create patient with body: ${JSON.stringify(req.body)}`);

    const { id_person, blood_type, allergies } = req.body;

    // data validation - check if all required fields are present
    if (!id_person || !blood_type || !allergies) {
        log.warning('Missing required fields in request body');
        return res.status(400).json({ error: 'Missing required fields: id_person, blood_type, allergies' });
    }

    try {
        log.debug(`Creating patient with id_person: ${id_person}, blood_type: ${blood_type}...`);
        const newPatient = await PatientModel.createPatient(id_person, blood_type, allergies);
        log.info(`Patient created successfully for person ID: ${newPatient.id_person}`);
        return res.status(201).json(newPatient);
    } catch (error) {
        log.error(`Error creating patient: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createPatient
};
