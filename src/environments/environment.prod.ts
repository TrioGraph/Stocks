export const environment = {
  production: true
};

export const requestHeaders = {
  'Authorization': 'Bearer AUTHORIZATION_TOKEN',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-UserType': 'USER',
  'X-SourceID': 'WEB',
  'X-ClientLocalIP': '192.168.1.5',
  'X-ClientPublicIP': '202.62.75.10',
  'X-MACAddress': ' 8C-C6-81-35-51-3E',
  'X-PrivateKey': 'B6aPWRUQ'
  }
  
  export const loginRequestHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-ClientLocalIP': '192.168.1.5',
    'X-ClientPublicIP': '202.62.75.10',
    'X-MACAddress': ' 8C-C6-81-35-51-3E',
    'X-PrivateKey': 'B6aPWRUQ'
    }
export const loginRequestParameters = JSON.stringify({
  "clientcode":"N242328",
  "password":"0019",
  "totp":"totp#"
  });

  export const getTokenRequestParameters = JSON.stringify({
    "refreshToken":"refreshToken#"
    });
  

