import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }


  GetAllAsync() {
    const headers = new HttpHeaders({
    });
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `/api/game`;
      console.log(apiURL)
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

  CreateAsync(GameCreateCommand: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });    
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `http://localhost:38481/api/Game`;
      this.http
      .post<any>(apiURL,JSON.stringify(GameCreateCommand), { headers: headers })
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
