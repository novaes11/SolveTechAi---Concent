// class to handle logging with different levels and colors
const pc = require('picocolors');

class Logger{
    
    constructor (className){
        this.className = className;
    }

    #log(level, messages){
        let dateTime = new Date().toISOString().replace('T', ' ').substring(0, 19);
        let color;

        switch(level){
            case 'DEBUG':
                color = pc.cyan;
                break;
            
            case 'INFO':
                color = pc.green;
                break;

            case 'WARNING':
                color = pc.yellow;
                break;

            case 'ERROR':
                color = pc.red;
                break;
        }
    
        let logMessage = `[${dateTime}] [${color(level)}] [${pc.blue(this.className)}] ${messages}`;

        console.log(logMessage);
    }

    debug(message){
        this.#log('DEBUG', message);
    }


    info(message){
        this.#log('INFO', message);
    }

    warning(message){
        this.#log('WARNING', message);
    }

    error(message){
        this.#log('ERROR', message);
    }
}

module.exports = Logger;