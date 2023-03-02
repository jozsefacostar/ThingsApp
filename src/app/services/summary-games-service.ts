import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SummaryGamesService {

    constructor(
        private http: HttpClient
    ) { }

    GetRecordsByUserAndSession(user) {
        console.log(user)
        const headers = new HttpHeaders({
        });
        const promise = new Promise<any>((resolve, reject) => {
            const apiURL = `http://localhost:38481/api/RecordBet/GetRecordsByUserAndSession/${user}`;
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
