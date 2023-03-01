import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';


@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    constructor(
        private http: HttpClient
    ) { }

    /** Función que crea HUB para comunicación con chart */
    public connectChartsSignalR() {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:38481/chart")
            .build();

        connection.start()
            .then(() => console.log("connection started"))
            .catch(err => console.log('error connection started' + err));

        connection.on("TransferChartData", data => {
            console.log(data);
        });
    }

    /** Función que dispara el metodo charts */
    public getCharts = () => {
        this.http.get('http://localhost:38481/api/Chart')
            .subscribe(res => {
                console.log(res);
            })
    }

    /** Función que lee cuando se ejecuta función de agregar partido */
    public connectAddGameSignalR() {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:38481/gameAdds")
            .build();

        connection.start()
            .then(() => console.log("connection startedd"))
            .catch(err => console.log('error connection startedd' + err));
        connection.on("TransferAddGameData", data => {
            console.log('partido creado: ' + data);
        });
    }
}
