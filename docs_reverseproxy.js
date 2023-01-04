const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { GITBOOK_PORT = 8085 } = process.env;


const app = express();
app.use(express.json());


app.get('*', async (_req, res) => {
    let requestedPath = _req.url;
    let staticHostingUrl = process.env.GITBOOK_URL;
    
    let realUrl;

    try {
        if (requestedPath === '/') {
            realUrl = staticHostingUrl;
        }
        else {
            realUrl = staticHostingUrl + requestedPath;
        }

        console.log(`Proxying request to ${realUrl}`);

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

app.listen(GITBOOK_PORT, () => {
  console.log(`Server listening at http://localhost:${GITBOOK_PORT}`);
});
