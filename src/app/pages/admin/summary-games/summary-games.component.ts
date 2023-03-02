import { Component, Input, OnInit } from '@angular/core';
import { RecordBetService } from 'src/app/services/record-bet.service';
import { MatDialog } from '@angular/material/dialog';
import { SummaryGamesService } from 'src/app/services/summary-games-service';
@Component({
  selector: 'app-summary-games',
  templateUrl: './summary-games.component.html',
  styleUrls: ['./summary-games.component.scss']
})
export class SummaryGamesComponent implements OnInit {
  displayedColumns: string[] = ['name','teamA', 'teamB', 'dateInitial', 'dateFinal', 'myScore', 'realScore', 'statusrecord', 'statusgame', 'online'];
  viewDoRecord: boolean = false;
  isAdmin: boolean = false;
  loading: boolean = false;
  records: any[] = []
  recordsDetail: any[] = []

  constructor(
    private SummaryGamesService: SummaryGamesService,
  ) { }

  isAdminSession() {
    this.isAdmin = localStorage.getItem("perfilUser") == "ADMIN" ? true : false;
  }


  async ngOnInit() {
    this.isAdminSession()
    this.getRecords()
  }

  async getRecords() {
    console.log(1)
    this.loading = true;
    await this.SummaryGamesService.GetRecordsByUserAndSession(localStorage.getItem("idUser"))
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.records = [] = []
          res.result.forEach((e: any) => {
            console.log(e)
            this.records.push(e);
            this.records = [...this.records]
          });
        }
        this.loading = true;
      }).catch(e => this.loading = false).then(filldatatable => {
      }
      ).catch(e => this.loading = false)
  }


}


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// export interface Group {
//   group: string;
// }

// const ELEMENT_DATA: (PeriodicElement | Group)[] = [
//   { group: "Group 1" },
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { group: "Group 2" },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { group: "Group 3" },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { GameService } from 'src/app/services/game.service';
// import { GeneralService } from 'src/app/services/general.service';
// import { Subscription } from 'rxjs';
// import { SessionBetService } from 'src/app/services/session-bet.service';
// import { RecordBetService } from 'src/app/services/record-bet.service';
// import { MatDialog } from '@angular/material/dialog';
// import { SignalRService } from 'src/app/services/signalr.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-summary-games',
//   templateUrl: './summary-games.component.html',
//   styleUrls: ['./summary-games.component.scss']
// })
// export class SummaryGamesComponent {
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;

//   isGroup(index, item): boolean {
//     return item.group;
//   }
// }
