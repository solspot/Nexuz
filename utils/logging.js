import { format } from 'date-fns';

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const logEvent = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd-HH:mm:ss')}`;
    const logItem = `${dateTime};${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

export const logger = (req, res, next) => {
    let ipAddress = req.socket.remoteAddress;
    logEvent(`${req.method} FROM ${ipAddress} @ ${req.headers.origin} TO -> ${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}
