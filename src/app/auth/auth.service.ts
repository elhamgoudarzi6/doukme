import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://api.doukme.ir/api/v1/user/';
  constructor(private http: HttpClient) { }

  authUser(data: any): any {
    return this.http.post(this.baseUrl + 'authUser', data);
  }

  getTokenSms(): any {
    let data = {
      UserApiKey: 'f2a1c337366e0cd3ddffc337',
      SecretKey: 'it66)%#teBC!@*&',
    };
    return this.http.post('https://RestfulSms.com/api/Token', data);
  }

  sendSms(data: any, token: any): any {
    const headers = {
      'content-type': 'application/json',
      'x-sms-ir-secure-token': token,
    };

    return this.http.post('https://RestfulSms.com/api/UltraFastSend', data, { 'headers': headers });
  }
}
