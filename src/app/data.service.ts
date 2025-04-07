import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { requestHeaders, loginRequestHeaders, loginRequestParameters, 
        getTokenRequestParameters } from '../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  userLogin(totp: any) {
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword',
      headers: loginRequestHeaders,
      data: loginRequestParameters,
    };
    config.data = config.data.replace('totp#', totp);
    axios(config)
      .then(function (response) {
        localStorage.setItem('jwtToken', response.data.data.jwtToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('feedToken', response.data.data.feedToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getToken() {
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelone.in/rest/auth/angelbroking/jwt/v1/generateTokens',
      headers: requestHeaders,
      data: getTokenRequestParameters,
    };
    config.headers.Authorization = config.headers.Authorization.replace('AUTHORIZATION_TOKEN', String(localStorage.getItem('jwtToken')));
    config.data = config.data.replace('refreshToken#', String(localStorage.getItem('refreshToken')));
    axios(config)
      .then(function (response) {
        localStorage.setItem('jwtToken', response.data.data.jwtToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('feedToken', response.data.data.feedToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getProfile() {
    var config = {
      method: 'get',
      url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/getProfile',
      headers: requestHeaders,
      data: getTokenRequestParameters,
    };
    config.headers.Authorization = config.headers.Authorization.replace('AUTHORIZATION_TOKEN', String(localStorage.getItem('jwtToken')));
    config.data = config.data.replace('refreshToken#', String(localStorage.getItem('refreshToken')));
    axios(config)
      .then(function (response) {
        console.log('response :', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  getStockDetails(token: any, name: any) {
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/getLtpData',
      headers: requestHeaders,
      data: JSON.stringify({
        "exchange":"NSE",
        "tradingsymbol": name,
        "symboltoken": token
    }),
    };
    // var config = {
    //   method: 'post',
    //   url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/getLtpData',
    //   headers: requestHeaders,
    //   data: JSON.stringify({
    //     "exchange":"NSE",
    //     "tradingsymbol":"SBIN-EQ",
    //     "symboltoken":"3045"
    // }),
    // };
    config.headers.Authorization = config.headers.Authorization.replace('AUTHORIZATION_TOKEN', String(localStorage.getItem('jwtToken')));
    config.data = config.data.replace('refreshToken#', String(localStorage.getItem('refreshToken')));
    axios(config)
      .then(function (response) {
        console.log('response :', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getStockDetailsByMode(mode: any, exchange: any, token: any, name: any) {
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/market/v1/quote/',
      headers: requestHeaders,
      data: JSON.stringify({
        "mode": mode,
        "exchangeTokens": {
          "exchangeType": [token]
        }
    }),
    };
    
    config.headers.Authorization = config.headers.Authorization.replace('AUTHORIZATION_TOKEN', String(localStorage.getItem('jwtToken')));
    config.data = config.data.replace('refreshToken#', String(localStorage.getItem('refreshToken')));
    config.data = config.data.replace('exchangeType', exchange);
    return axios(config);
     
  }

  getHistoricalStockDetails() {
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/historical/v1/getCandleData',
      headers: requestHeaders,
      data: JSON.stringify({"exchange":"NSE","symboltoken":"99926000",
        "interval":"ONE_MINUTE","fromdate":"2021-02-08 09:00",
        "todate":"2021-02-08 09:16"}),
    };
    config.headers.Authorization = config.headers.Authorization.replace('AUTHORIZATION_TOKEN', String(localStorage.getItem('jwtToken')));
    config.data = config.data.replace('refreshToken#', String(localStorage.getItem('refreshToken')));
    axios(config)
      .then(function (response) {
        console.log('response :', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
