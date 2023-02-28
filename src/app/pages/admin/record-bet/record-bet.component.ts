import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { GeneralService } from 'src/app/services/general.service';
import { Subscription } from 'rxjs';
import { SessionBetService } from 'src/app/services/session-bet.service';
import { RecordBetService } from 'src/app/services/record-bet.service';

@Component({
  selector: 'app-record-bet',
  templateUrl: './record-bet.component.html',
  styleUrls: ['./record-bet.component.scss']
})
export class RecordBetComponent implements OnInit {

  viewDoRecord: boolean = false;
  isAdmin: boolean = false;
  loading: boolean = false;
  form: FormGroup = new FormGroup({});
  formRecordBet: FormGroup = new FormGroup({});
  flag: boolean = true;
  InfoSession: InfoSession = new InfoSession()

  constructor(
    private fb: FormBuilder,
    private sessionBet_Service: SessionBetService,
    private general_Service: GeneralService,
    private recordBetService: RecordBetService
  ) { }

  isAdminSession() {
    this.isAdmin = localStorage.getItem("perfilUser") == "ADMIN" ? true : false;
  }
  initForm() {
    this.InfoSession = new InfoSession();
    this.form = this.fb.group({
      code: [null, [Validators.required]]
    });

    this.formRecordBet = this.fb.group({
      sessionBet: [null, [Validators.required]],
      user: [null, [Validators.required]],
      goalsA: [null, [Validators.required, Validators.min(0)]],
      goalsB: [null, [Validators.required, Validators.min(0)]],
      Game: [null, [Validators.required]]
    });
  }

  async ngOnInit() {
    this.isAdminSession()
    this.initForm();
  }


  async getSession() {
    await this.sessionBet_Service
      .GetAllAsync(this.form.value.code)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.general_Service.alert(res.message);
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