const Logger = require('../core/logger');
const log = new Logger('backend/src/controllers/loginController.js');

const LoginModel = require('../models/loginModel');

const createLogin = async (req, res) => {
    // data received from frontend(client)
    log.debug(`Received POST request to create login with body: ${JSON.stringify(req.body)}`);

    const { id_person, email, password_hash } = req.body;

    // data validation - check if all required fields are present
    if (!id_person || !email || !password_hash) {
        log.warning('Missing required fields in request body');
        return res.status(400).json({ error: 'Missing required fields: id_person, email, password_hash' });
    }

    try {
        log.debug(`Creating login with id_person: ${id_person}, email: ${email}...`);
        const newLogin = await LoginModel.createLogin(id_person, email, password_hash);
        log.info(`Login created successfully for person ID: ${id_person}`);
        return res.status(201).json(newLogin);
    } catch (error) {
        log.error(`Error creating login: ${error.message}`);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createLogin
};
