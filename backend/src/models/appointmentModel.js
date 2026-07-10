const { dbPool } = require('../config/database');
const Logger = require('../core/logger');
const log = new Logger('backend/src/models/appointmentModel.js');

const appointmentModel = {
    createAppointment: async (id_patient, id_doctor, scheduled_at, description) => {
        log.info('Criando agendamento');
        log.debug(`Parameters received: scheduled_at=${scheduled_at}, id_patient=${id_patient}, id_doctor=${id_doctor}, description=${description}`);

        const query = `
            INSERT INTO appointment (
                id_patient, id_doctor, scheduled_at, description
            ) VALUES ($1, $2, $3, $4)
            RETURNING id_appointment
        `;

        const values = [id_patient, id_doctor, scheduled_at, description];

        try {
            log.debug(`Executing query: ${query} with values: ${values}`);
            const res = await dbPool.query(query, values);
            if (res.rows.length === 0) {
                throw log.error('Appointment not created', 'createAppointment');
            }
            log.info('Appointment created successfully!');
            return res.rows[0];
        } catch (error) {
            log.error(`Error creating appointment: ${error.message}`);
            throw error;
        }
    }
}

module.exports = appointmentModel;
