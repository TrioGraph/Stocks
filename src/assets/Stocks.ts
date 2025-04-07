export const data =[
    {
        "screen1": {
            "data": { 
            "exchange":"NSE",
            "symboltoken":"3045",
            "interval":"ONE_MINUTE",
            "fromdate":"2021-02-08 09:00",
            "todate":"2021-02-08 09:16"
        },
        "headers":{
            "X-PrivateKey": "B6aPWRUQ", 
            "Accept": "application/json, application/json", 
            "X-SourceID": "WEB, WEB", 
            "X-ClientLocalIP": "192.168.1.5", 
            "X-ClientPublicIP": "202.62.75.10", 
            "X-MACAddress": "8C-C6-81-35-51-3E", 
            "X-UserType": "USER", 
            "Authorization": "Bearer AUTHORIZATION_TOKEN", 
            "Content-Type": "application/json"
        },
        "method": "Put",
        "url": "https://apiconnect.angelone.in/rest/secure/angelbroking/historical/v1/getCandleData"
        }
    }
]

export const IntervalConstants = [
    { 1: "ONE_MINUTE" },
    { 2: "THREE_MINUTE" },
    { 3: "FIVE_MINUTE" },
    { 4: "TEN_MINUTE" },
    { 5: "FIFTEEN_MINUTE" },
    { 6: "THIRTY_MINUTE" },
    { 7: "ONE_HOUR" },
    { 8: "ONE_DAY" },
];