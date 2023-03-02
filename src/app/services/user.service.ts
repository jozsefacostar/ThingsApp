import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }



   Login(UserLoginCommand: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `http://localhost:38481/api/User`;
      this.http
        .post<any>(apiURL, JSON.stringify(UserLoginCommand), { headers: headers })
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }


  Logout(UserLogoutEventHandler: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `http://localhost:38481/api/User`;
      this.http
        .put<any>(apiURL, JSON.stringify(UserLogoutEventHandler), { headers: headers })
        .toPromise()
        .then((res: any) => {
          // Success
          resolve(res);
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }
}
