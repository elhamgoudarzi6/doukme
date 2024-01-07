import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
 baseUrl = 'https://api.doukme.ir/api/v1/user/';

  constructor(private http: HttpClient) { }

  authUser(data: any): any {
    return this.http.post(this.baseUrl + 'authUser', data);
  }
  getEmployeeRating(id: any): any {
    return this.http.get(this.baseUrl + 'getEmployeeRating/' + id);
  }

  registerEmployeeRating(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerEmployeeRating', data, { params });
  }
  registerReservation(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerReservation', data, { params });
  }
  advanceSearchEmployee(data: any): any {
    return this.http.post(this.baseUrl + 'advanceSearchEmployee', data);
  }
  getAllPlanForEmployee(id: any): any {
    return this.http.get(this.baseUrl + 'getAllPlanForEmployee/' + id);
  }
  getAllPackage(): any {
    return this.http.get(this.baseUrl + 'getAllPackage');
  }
  getAllCvpack(): any {
    return this.http.get(this.baseUrl + 'getAllCvpack');
  }
  //#region Discounts
  getAllDiscounts(): any {
    return this.http.get(this.baseUrl + 'getAllDiscount');
  }
  //#endregion


  //#region category
  getAllEmployeeCat(): any {
    return this.http.get(this.baseUrl + 'getAllEmployeeCat');
  }
  //#endregion

  //#region Subsciptions
  addSubscription(data: any): any {
    return this.http.post(this.baseUrl + 'registerSubscription', data);
  }
  //#endregion

  registerJobRequest(data: any): any {
    return this.http.post(this.baseUrl + 'registerJobRequest', data);
  }

  getAllJobCat(): any {
    return this.http.get(this.baseUrl + 'getAllJobCat');
  }
  //#region Contact Messages
  addContactUs(data: any): any {
    return this.http.post(this.baseUrl + 'registerContactUs', data);
  }
  //#endregion

  //#region Agents
  getAllEmployee(): any {
    return this.http.get(this.baseUrl + 'getAllEmployee');
  }
  getEmployee(id: string): any {
    return this.http.get(this.baseUrl + 'getEmployee/' + id);
  }
  //#endregion

  //#region Faqs
  getAllFaqs(): any {
    return this.http.get(this.baseUrl + 'getAllFaq');
  }
  //#endregion

  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }
  getResultJobRequest(data: any): any {
    return this.http.post(this.baseUrl + 'getResultJobRequest', data);
  }
  updateJobRequest(data: any): any {
    return this.http.put(this.baseUrl + 'updateJobRequest', data);
  }

  //shop

  getAllProductCat(): any {
    return this.http.get(this.baseUrl + 'getAllProductCat');
  }

  getAllNewProduct(): any {
    return this.http.get(this.baseUrl + 'getAllNewProduct');
  }
 
  getAllSeller(): any {
    return this.http.get(this.baseUrl + 'getAllSeller');
  }
  advanceSearchProduct(data: any): any {
    return this.http.post(this.baseUrl + 'advanceSearchProduct',data);
  }
  getProduct(id: any): any {
    return this.http.get(this.baseUrl + 'getProduct/' + id);
  }
  registerComment(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerComment', data, { params });
  }
getCommentsForProduct(id: any): any {
    return this.http.get(this.baseUrl + 'getCommentsForProduct/' + id);
  }
}

