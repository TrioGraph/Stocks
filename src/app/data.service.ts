import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,catchError, filter, map, Subject } from 'rxjs';
import {
  requestHeaders,
  loginRequestHeaders,
  loginRequestParameters,
  getTokenRequestParameters,
} from '../environments/environment';
 

@Injectable({
  providedIn: 'root',
})
export class DataService {
  headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  stocksList!: Observable<any[]>;
  orderApiUrl = 'https://apiconnect.angelone.in/rest/secure/angelbroking/order/v1/';
  JwtToken: any;
  RefreshToken: any;
  FeedToken: any;
  constructor(private http: HttpClient) {}

  private buildHeaders(template: any): HttpHeaders {
    const headersObj: any = { ...template };
    if (headersObj.Authorization && headersObj.Authorization.indexOf('AUTHORIZATION_TOKEN') >= 0) {
      const token = this.JwtToken ?? String(localStorage.getItem('jwtToken')) ?? '';
      headersObj.Authorization = headersObj.Authorization.replace('AUTHORIZATION_TOKEN', token);
    }
    return new HttpHeaders(headersObj);
  }

  getStocksLists(searchText: any): Observable<any[]> {
    // if (this.stocksList) {
    //   return this.stocksList;
    // } else {
      return this.http.get<any[]>('./assets/OpenAPIScripMaster.json');
    // }
  }

  userLogin(totp: any) {
    const payload = JSON.parse(loginRequestParameters);
    payload.totp = payload.totp?.replace('totp#', totp) || totp;
    const headers = this.buildHeaders(loginRequestHeaders);
    return this.http.post<any>('/api/login', payload, { headers });
  }

  getToken() {
    console.log('this.JwtToken:', this.JwtToken);
    console.log('this.RefreshToken:', this.RefreshToken);
    const payload = JSON.parse(getTokenRequestParameters);
    payload.refreshToken = this.RefreshToken ?? String(localStorage.getItem('refreshToken')) ?? payload.refreshToken;
    const headers = this.buildHeaders(requestHeaders);
    return this.http.post<any>('/api/generateTokens', payload, { headers });
  }

  getProfile() {
    const headers = this.buildHeaders(requestHeaders);
    return this.http.get<any>('/api/getProfile', { headers });
  }

  getStockDetails(exchange: any, token: any, tradingsymbol: any) {
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
    const payload = { exchange, tradingsymbol, symboltoken: token };
    const headers = this.buildHeaders(requestHeaders);
    return this.http.post<any>('/api/getLtpData', payload, { headers });
  }

  getStockDetailsByMode(mode: any, exchange: any, token: any, name: any) {
    const payload: any = { mode, exchangeTokens: {} };
    payload.exchangeTokens[exchange] = [token];
    const headers = this.buildHeaders(requestHeaders);
    return this.http.post<any>('/api/quote', payload, { headers });
  }

  getHistoricalStockDetails(
    exchange: any,
    token: any,
    interval: any,
    fromDate: any,
    toDate: any
  ) {
    const payload = { exchange, symboltoken: token, interval, fromdate: fromDate, todate: toDate };
    const headers = this.buildHeaders(requestHeaders);
    return this.http.post<any>('/api/getCandleData', payload, { headers });
  }

  getCategoriesList() {
    let url = '/assets/Categories.json';
    return this.http.get(url);
  }

    getSavedStocks(): Observable<any> {
    return this.http.get('/api/fileapi');
  }

  saveToFile(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('/api/fileapi', 
      data, { headers });
  }

// Mock implementation of StocksHelper.GetExpiryDates
  getExpiryDate(asset: string): Date {
    let today = new Date();
    today = this.getExpiryDates(asset);
    return today; 
  }

  getExpiryDates(exchangeType: string): Date {
  const today = new Date();
  // Clear the time portion to match C#'s DateTime.Today behavior
  today.setHours(0, 0, 0, 0);

  if (exchangeType === 'NIFTY') {
    const TUESDAY = 2; // JavaScript Date: 0 = Sunday, 1 = Monday, 2 = Tuesday...
    
    // Calculate days until next Tuesday
    let daysUntilTuesday = (TUESDAY - today.getDay() + 7) % 7;

    // If you need to uncomment the "strict next week" logic if today is Tuesday:
    // if (daysUntilTuesday === 0) { daysUntilTuesday = 7; }

    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + daysUntilTuesday);
    return nextTuesday;

  } else if (exchangeType === 'SENSEX') {
    const THURSDAY = 4; // JavaScript Date: 4 = Thursday

    // Calculate days until next Thursday
    let daysUntilThursday = (THURSDAY - today.getDay() + 7) % 7;

    // If you need to uncomment the "strict next week" logic if today is Thursday:
    // if (daysUntilThursday === 0) { daysUntilThursday = 7; }

    const nextThursday = new Date(today);
    nextThursday.setDate(today.getDate() + daysUntilThursday);
    return nextThursday;
  }

  return new Date(); // Corresponds to DateTime.Now
}
  // Format date to "ddMMMyyyy" format (e.g., 25JUN2026)
  formatExpiryDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}${month}${year}`;
  }

  // Replaces smartApi.GetLTPData
  getLTPData(exchange: string, token: string, symbol: string) {
    // const payload = { exchange, symboltoken: token, tradingsymbol: symbol };
    // return this.http.post<any>(`${this.apiUrl}ltp`, payload);

    const payload = { exchange, tradingsymbol: symbol, symboltoken: token };
    const headers = this.buildHeaders(requestHeaders);
    return this.http.post<any>('/api/getLtpData', payload, { headers });
  }

  // Replaces smartApi.placeOrder
  placeOrder(order: OrderInfo) {
    // return this.http.post<any>(`${this.orderApiUrl}placeOrder`, order);

    // const payload = { exchange, symboltoken: token, tradingsymbol: symbol };
    // return this.http.post<any>(`${this.apiUrl}ltp`, payload);

    const headers = this.buildHeaders(requestHeaders);
    return this.http.post<any>('/api/placeorder', order, { headers });

  }

  // Simulated implementation of StocksHelper.StocksList
  getMockInstruments(): any[] {
    return [
      { name: 'NIFTY', token: '99926037', symbol: 'NIFTY26JUN2622000CE', exch_seg: 'NFO', expiry: '25JUN2026', strike: '2200000', instrumenttype: 'OPTIDX' },
      { name: 'NIFTY', token: '99926038', symbol: 'NIFTY26JUN2622000PE', exch_seg: 'NFO', expiry: '25JUN2026', strike: '2200000', instrumenttype: 'OPTIDX' },
      { name: 'SENSEX', token: '11126037', symbol: 'SENSEX26JUN2672000CE', exch_seg: 'BFO', expiry: '25JUN2026', strike: '7200000', instrumenttype: 'OPTIDX' },
    ];
  }

}

export interface OrderInfo {
  variety: string;
  tradingsymbol: string;
  symboltoken: string;
  transactiontype: string;
  exchange: string;
  ordertype: string;
  producttype: string;
  duration: string;
  price: string;
  squareoff: string;
  stoploss: string;
  quantity: string;
  triggerprice: string;
  trailingStopLoss: string;
  disclosedquantity: string;
  ordertag: string;
}

export interface OptionContract {
  token: string;
  symbol: string;
  strike: number;
  optionType: 'CE' | 'PE';
  exchange: string;
  displayText: string;
}