Stocks API proxy

Steps to run locally:

1. Install server dependencies

```bash
cd server
npm install
```

2. Start the proxy server

```bash
npm start
```

3. Start Angular dev server with proxy

From project root:

```bash
npm run start -- --proxy-config proxy.conf.json
```

Now requests to `/api/*` from the Angular app will be forwarded to the external APIs via this server.
