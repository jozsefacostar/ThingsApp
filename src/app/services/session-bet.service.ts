import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionBetService {

  constructor(
    private http: HttpClient
  ) { }

  GetAllAsync(code) {
    const headers = new HttpHeaders({
    });
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `http://localhost:38481/api/SessionBet/${code}`;
      this.http
        .get<any[]>(apiURL, { headers: headers })
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

  CreateAsync(SessionBetCreateCommand: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `http://localhost:38481/api/SessionBet`;
      this.http
        .post<any>(apiURL, JSON.stringify(SessionBetCreateCommand), { headers: headers })
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
