import express from 'express';
import * as dotenv from 'dotenv'
import axios from 'axios';
import { logger } from './logging.js';
dotenv.config()

const { PORT = 3200 } = process.env;


const app = express();
app.use(express.json());
app.use(logger);


app.get('*', async (_req, res) => {
    let requestedPath = _req.url;
    let staticHostingUrl = process.env.STATIC_HOSTING_URL;
    
    let realUrl;

    try {
        if (requestedPath === '/') {
            realUrl = staticHostingUrl;
        }
        else {
            realUrl = staticHostingUrl + requestedPath;
        }

        let proxiedData = await axios.get(realUrl, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });

        // Copy status code from proxied response
        res.status(proxiedData.status);

        // Copy headers from proxied response
        for (let header in proxiedData.headers) {
            res.setHeader(header, proxiedData.headers[header]);
        }

        // Send proxied response
        res.send(proxiedData.data);
    }
    catch (err) {
        console.log(err);
        res.status(404).send('Resource not found');
    }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});
