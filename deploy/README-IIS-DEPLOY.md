IIS deployment steps for Angular app and Node proxy

Prerequisites
- Windows Server / Windows with IIS installed
- IIS modules: URL Rewrite and Application Request Routing (ARR)
- Node.js installed on the server
- Optional: `nssm` or `pm2-windows-service` to run Node as a service

High-level plan
1. Build the Angular app and copy `dist/stocks` to your IIS site physical path.
2. Place the provided `angular-web.config` into the site root (the same folder as `index.html`).
3. Ensure Node proxy is running on the server (recommended as a Windows service).
4. Enable ARR proxying in IIS and make sure the `ReverseProxyApi` rule will forward `/api` to `http://localhost:3000`.

Commands (run from project root)

Build Angular production bundle:
```powershell
npm install
npm run build -- --configuration production
# or: ng build --configuration production
```

After build, copy the output folder to your IIS site's physical path. Example (PowerShell):
```powershell
# replace <IIS_SITE_PATH> with your site folder, e.g. C:\inetpub\wwwroot\stocks
Remove-Item -Recurse -Force <IIS_SITE_PATH>\* 
Copy-Item -Recurse -Force .\dist\stocks\* <IIS_SITE_PATH>\
Copy-Item .\deploy\angular-web.config <IIS_SITE_PATH>\web.config
```

Node proxy: run as a service (recommended)
1. Install `nssm` (https://nssm.cc/). Then:
```powershell
nssm install StocksNode "C:\Program Files\nodejs\node.exe" "D:\Angular\Stocks\server\index.js"
nssm set StocksNode AppDirectory D:\Angular\Stocks\server
nssm start StocksNode
```
Or use `pm2` with Windows service wrapper.

IIS configuration (URL Rewrite + ARR)
1. Install URL Rewrite and ARR.
2. In IIS Manager, click the server node -> "Application Request Routing Cache" -> "Server Proxy Settings" -> enable "Proxy".
3. Create a new Site in IIS pointing to the physical path where you copied the Angular build.
4. The `angular-web.config` contains a rule to rewrite `/api/*` to `http://localhost:3000/api/*`. Confirm it works.

Notes and troubleshooting
- The `/api` rewrite uses ARR reverse proxy. Ensure outbound proxy is allowed and ARR is enabled.
- If you prefer IIS to host Node directly, consider `iisnode` (community) but ARR + a Windows service for Node is simpler and more robust.
- Logs:
  - IIS logs: %SystemDrive%\inetpub\logs\LogFiles
  - Node app: configure `nssm` stdout/stderr or use a process manager to persist logs
