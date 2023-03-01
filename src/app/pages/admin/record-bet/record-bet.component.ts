import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { GeneralService } from 'src/app/services/general.service';
import { Subscription } from 'rxjs';
import { SessionBetService } from 'src/app/services/session-bet.service';
import { RecordBetService } from 'src/app/services/record-bet.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpUpdateScoresUserComponent as PopUpUpdateScoresUserComponent } from './pop-up-uodate-scores-user/pop-up-uodate-scores-user.component';
import { SignalRService } from 'src/app/services/signalr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-record-bet',
  templateUrl: './record-bet.component.html',
  styleUrls: ['./record-bet.component.scss']
})
export class RecordBetComponent implements OnInit {
  displayedColumns1: string[] = ['name', 'myScore', 'realScore', 'status', 'online'];
  displayedColumns: string[] = ['teamA', 'teamB', 'dateInitial', 'dateFinal', 'myScore', 'realScore', 'edit', 'view'];
  viewDoRecord: boolean = false;
  isAdmin: boolean = false;
  loading: boolean = false;
  form: FormGroup = new FormGroup({});
  formRecordBet: FormGroup = new FormGroup({});
  flag: boolean = true;
  InfoSession: InfoSession = new InfoSession()
  records: any[] = []
  recordsDetail: any[] = []
  viewDetail: boolean = false;
  gamesNames: string = '';
  statusgame: Number = 0; //0: Finalizado 1: En juego 2: Pendiente por jugar : 3: Jugado

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private sessionBet_Service: SessionBetService,
    private general_Service: GeneralService,
    private recordBetService: RecordBetService,
    private httpCLiente: HttpClient,
  ) {
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.getRecords();
    });

  }

  isAdminSession() {
    this.isAdmin = localStorage.getItem("perfilUser") == "ADMIN" ? true : false;
  }
  initForm() {
    this.InfoSession = new InfoSession();
    this.form = this.fb.group({
      code: [null, [Validators.required]]
    });

    this.formRecordBet = this.fb.group({
      sessionBet: [null],
      user: [null],
      goalsA: [null, [Validators.required, Validators.min(0)]],
      goalsB: [null, [Validators.required, Validators.min(0)]],
      Game: [null]
    });
  }


  async ngOnInit() {
    this.isAdminSession()
    this.initForm()
    this.getRecords()
  }

  openDialog(row) {
    console.log(row)
    this.dialogRef.open(PopUpUpdateScoresUserComponent,
      {
        data:
        {
          id: row.recordBets,
          teamA: row.teamA,
          teamB: row.teamB,
          goalsA: row.goalsA,
          goalsB: row.goalsB,
          sessionBet: row.sessionBet
        }
      });
  }

  async getRecords() {
    this.loading = true;
    await this.recordBetService.GetRecordsByUser(localStorage.getItem("idUser"))
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.records = [] = []
          res.result.forEach((e: any) => {
            this.records.push(e);
            this.records = [...this.records]
          });
        }
      }).catch(e => this.loading = false).then(filldatatable => {
      }
      ).catch(e => this.loading = false)
  }



  async GetRecordBySession(row) {
    console.log(row)
    this.loading = true;
    await this.recordBetService.GetRecordBySession(row.sessionBet)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.statusgame = row.statusGame
          console.log(this.statusgame)
          this.gamesNames = row.teamA + ' - ' + row.teamB
          this.viewDetail = true;
          this.recordsDetail = [] = []
          res.result.forEach((e: any) => {
            this.recordsDetail.push(e);
            this.recordsDetail = [...this.recordsDetail]
          });
        }
        else {
          this.general_Service.alert(res.message);
          this.gamesNames = ''
          this.viewDetail = false;
        }
      }).catch(e => this.loading = false).then(filldatatable => {
      }
      ).catch(e => this.loading = false)
  }

  async getSession() {
    await this.sessionBet_Service
      .GetAllAsync(this.form.value.code)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.general_Service.alert('Digite su marcador de apuesta');
          this.InfoSession.teamA = res.result.teamA;
          this.InfoSession.teamB = res.result.teamB;
          this.InfoSession.game = res.result.game;
          this.InfoSession.sessionBet = res.result.sessionBet;
          this.InfoSession.user = localStorage.getItem("idUser");
          this.viewDoRecord = true;
        }
        else this.general_Service.alert(res.message, 'error');
      })
      .catch((e) => (this.loading = false));
  }

  async createRecord() {
    this.InfoSession.goalsA = this.formRecordBet.value.goalsA;
    this.InfoSession.goalsB = this.formRecordBet.value.goalsB;
    await this.recordBetService
      .CreateAsync(this.InfoSession)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.general_Service.alert(res.message);
          this.viewDoRecord = false;
          this.getRecords()
          this.initForm()
        }
        else this.general_Service.alert(res.message, 'error');
      })
      .catch((e) => (this.loading = false));
  }
}


export class InfoSession {
  teamA: string = ''
  teamB: string = ''
  game: string = ''
  user: string | null
  goalsA: Number
  goalsB: Number
  sessionBet: Number
}