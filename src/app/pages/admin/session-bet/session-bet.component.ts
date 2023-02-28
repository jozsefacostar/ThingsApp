import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { GeneralService } from 'src/app/services/general.service';
import { TeamService } from 'src/app/services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SessionBetService } from 'src/app/services/session-bet.service';

@Component({
  selector: 'app-session-bet',
  templateUrl: './session-bet.component.html',
  styleUrls: ['./session-bet.component.scss']
})
export class SessionBetComponent implements OnInit {

  isAdmin: boolean = false
  teams: any[] = [];
  games: any[] = [];
  loading: boolean = false;
  form: FormGroup = new FormGroup({});
  flag: boolean = true;

  message: string;
  subscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private sessionBet_Service: SessionBetService,
    private general_Service: GeneralService,
    private games_Service: GameService,
    private dialogRef: MatDialog
  ) { }


  isAdminSession() {
    this.isAdmin = localStorage.getItem("perfilUser") == "ADMIN" ? true : false;
  }
  initForm() {
    this.form = this.fb.group({
      Game: [null, [Validators.required]],
      Name: [null, [Validators.required]]
    });
  }

  async ngOnInit() {
    this.isAdminSession()
    this.initForm();
    this.loadData();
  }

  async loadData() {
    this.games = []
    this.loading = true;
    await this.games_Service.GetAllForSession()
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          res.result.forEach((e: any) => this.games.push(e));
        }
      }).catch(e => this.loading = false).then(filldatatable => {
      }
      ).catch(e => this.loading = false)
  }

  async saveSession() {
    await this.sessionBet_Service
      .CreateAsync(this.form.value)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.general_Service.alert('Comparte este código a tus compañeros para apostar: ' + res.result);
          this.initForm()
        }
        else this.general_Service.alert(res.message, 'error');
      })
      .catch((e) => (this.loading = false));
  }
}


