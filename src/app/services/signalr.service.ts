import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { GeneralService } from './general.service';
import { RecordBetService } from './record-bet.service';


@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    records: any[] = []
    constructor(
        private recordBetService: RecordBetService,
        private general_Service: GeneralService,
        private http: HttpClient
    ) { }


    async getRecords() {
        await this.recordBetService.GetRecordsByUser(localStorage.getItem("idUser"))
            .then((res: any) => {
                // this.loading = false;
                if (res.success) {
                    this.records = [] = []
                    res.result.forEach((e: any) => {
                        this.records.push(e);
                        this.records = [...this.records]
                    });
                }
            }).catch()
    }


    /** Función que crea HUB para comunicación con chart */
    public connectChartsSignalR() {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:38481/allGames")
            .build();

        connection.start()
            .then(() => console.log("connection started"))
            .catch(err => console.log('error connection started' + err));

        connection.on("AllGamesSummary", data => {
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
        let connectionn = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:38481/gameAdds")
            .build();

        connectionn.start()
            .then(() => console.log("connection add"))
            .catch(err => console.log('error connection add' + err));
        connectionn.on("TransferAddGameData", data => {
            console.log('partido creado: ' + data);
            this.general_Service.alertSingle(data)
        });
    }
    /** Función que lee cuando se ejecuta función modificar marcadores */

    public updateScoresGameSignalR() {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:38481/updateScores")
            .build();

        connection.start()
            .then(() => console.log("connection update"))
            .catch(err => console.log('error connection update' + err));
        connection.on("transfer", data => {
            console.log('partido creado: ' + data);
            this.general_Service.alertSingle(data)
        });
    }

    /** Función que notifica cambios de apuestas por un usuario */

    public updateScoresByUserSignalR() {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:38481/updateScoresByUser")
            .build();

        connection.start()
            .then(() => console.log("connection update by user"))
            .catch(err => console.log('error connection update by user' + err));
        connection.on("UpdateScoresByUser", data => {
            console.log('partido creado por usuario: ' + data);
            this.general_Service.alertSingle(data)
        });
    }



}
