# Nexuz

Nexuz is a decentralized application that allows you to create landing pages and stores the data in the Solana blockchain. 


## Access

There is a version of Nexuz that we hosted on Arweave that is directly accesable at:

```
https://4xddeaj2c3fopgkhbrd7uojoud43zenoiuxakggkoyhr5lezzfea.arweave.net/5cYyAToWyueZRwxH-jkuoPm8ka5FLgUYynYPHqyZyUg
```

To access the frontend directly on Arweave you will need to either host your own reverse Proxy or change the frontend to hosting not at the root level of a domain. 


You can also access Nexuz with our reverse proxy:

```
https://nexuz.me
```

Solana Program ID:


```
6C5Mf4sDpFzhNbrZtMf1b4RFLbnAzUdZ9C86cz2MZPh (public IDL)

https://solscan.io/account/6C5Mf4sDpFzhNbrZtMf1b4RFLbnAzUdZ9C86cz2MZPh
```


## Installation

To self host the frontend you can either build the project with vite or use Docker. 

Vite:

```bash
- Run dev server:
    cd app
    npm run i
    npm run dev
  
- Run build server:
    cd app
    npm run i
    npm run build
    node server.cjs
  
- Run reverse Proxy to Arweave:
    npm i
    create .env File (check example.env)
    node reverse.js
```

Docker: 

```bash
  docker build -t nexuz .
  docker run -p 8080:8080 nexuz
```


## About us

Nexuz is a Tool created and maintained by the Solspot Team. 


