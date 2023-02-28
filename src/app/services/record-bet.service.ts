import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordBetService {

  constructor(
    private http: HttpClient
  ) { }

  CreateAsync(SessionBetCreateCommand: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `http://localhost:38481/api/RecordBet`;
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
