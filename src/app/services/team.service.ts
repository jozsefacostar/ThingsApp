import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: HttpClient
  ) { }
 
  // GetAll(): Observable<any> {
  //   return this.http.get<any>('http://localhost:38481/api/Team')
  //   // return this.http.get<any>('/api/Team')

  // }

  GetAllAsync(){
    const headers = new HttpHeaders({
    });    
    const promise = new Promise<any>((resolve, reject) => {
      const apiURL = `http://localhost:38481/api/Team`;
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
}
