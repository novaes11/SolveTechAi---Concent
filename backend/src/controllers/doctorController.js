const Logger = require('../core/logger');
const log = new Logger('backend/src/controllers/doctorController.js');

const DoctorModel = require('../models/doctorModel');

const createDoctor = async (req, res) => {
    // data received from frontend(client)
    log.debug(`Received POST request to create doctor with body: ${JSON.stringify(req.body)}`);

    const { id_person, crm, crm_uf, speciality } = req.body;

    // data validation - check if all required fields are present
    if (!id_person || !crm || !crm_uf || !speciality) {
        log.warning('Missing required fields in request body');
        return res.status(400).json({ error: 'Missing required fields: id_person, crm, crm_uf, speciality' });
    }

    try {
        log.debug(`Creating doctor with id_person: ${id_person}, crm: ${crm}...`);
        const newDoctor = await DoctorModel.createDoctor(id_person, crm, crm_uf, speciality);
        log.info(`Doctor created successfully for person ID: ${newDoctor.id_person}`);
        return res.status(201).json(newDoctor);
    } catch (error) {
        log.error(`Error creating doctor: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createDoctor
};
