const Logger = require('../core/logger');

const log = new Logger('backend/src/controllers/appointmentController.js');

const AppointmentModel = require('../models/appointmentModel');

const createAppointment = async (req, res) => {
    // data received from frontend(client)
    log.debug(`Received POST request to create appointment with body: ${JSON.stringify(req.body)}`);

    const { id_patient, id_doctor, scheduled_at, description } = req.body;

    // data validation - check if all required fields are present
    if (!id_patient || !id_doctor || !scheduled_at) {
        log.warning('Missing required fields in request body');
        return res.status(400).json({ error: 'Missing required fields: id_patient, id_doctor, scheduled_at' });
    }

    const scheduledAt = new Date(scheduled_at);
    const today = new Date();

    // data validation - check if scheduled_at is a valid date in the future
    if (isNaN(scheduledAt.getTime()) || scheduledAt <= today) {
        log.warning(`Invalid scheduled_at value. It must be a valid date in the future. Received: ${scheduled_at}`);
        return res.status(400).json({ error: 'Invalid scheduled_at value. It must be a valid date in the future.' });
    }

    try {
        log.debug(`Creating appointment with parameters: id_patient=${id_patient}, id_doctor=${id_doctor}, scheduled_at=${scheduledAt}, description=${description}`);
        const newAppointment = await AppointmentModel.createAppointment(id_patient, id_doctor, scheduledAt, description);
        log.info(`Appointment created successfully with ID: ${newAppointment.id_appointment}`);
        return res.status(201).json(newAppointment);
    } catch (error) {
        log.error(`Error creating appointment: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createAppointment
};  