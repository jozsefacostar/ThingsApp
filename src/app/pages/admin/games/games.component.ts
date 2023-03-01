import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { GeneralService } from 'src/app/services/general.service';
import { TeamService } from 'src/app/services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupScoresComponent } from './popup-scores/popup-scores.component';
import { Subscription } from 'rxjs';
import { SignalRService } from 'src/app/services/signalr.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  displayedColumns: string[] = ['teamA', 'teamB', 'dateInitial', 'dateFinal', 'resultScore'];
  teams: any[] = [];
  games: any[] = [];
  gameFinish: any[] = [];
  loading: boolean = false;
  form: FormGroup = new FormGroup({});
  flag: boolean = true;

  message: string;
  subscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private teams_Service: TeamService,
    private general_Service: GeneralService,
    private games_Service: GameService,
    private signalR: SignalRService,
    private dialogRef: MatDialog
  ) {
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.getGames();
    });

  }

  initForm() {
    this.form = this.fb.group({
      teamA: [null, [Validators.required]],
      teamB: [null, [Validators.required]],
      dateInitial: [null, [Validators.required]],
    });
  }



  openDialog(row) {
    this.dialogRef.open(PopupScoresComponent,
      {
        data:
        {
          id: row.id,
          teamA: row.teamA,
          teamB: row.teamB,
          goalsA: row.goalsA,
          goalsB: row.goalsB
        }
      });

  }

  async ngOnInit() {
    this.initForm();
    this.loadData();
    this.getGames();
  }


  async loadData() {
    this.teams = []
    this.loading = true;
    await this.teams_Service.GetAllAsync()
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          res.result.forEach((e: any) => this.teams.push(e));
        }
      }).catch(e => this.loading = false).then(filldatatable => {
      }
      ).catch(e => this.loading = false)
  }

  async getGames() {
    this.loading = true;
    await this.games_Service.GetAllAsync(false)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.games = [] = []
          res.result.forEach((e: any) => {
            this.games.push(e);
            this.games = [...this.games]
          });
        }
      }).catch(e => this.loading = false).then(filldatatable => {
      }
      ).catch(e => this.loading = false)

    this.loading = true;
    await this.games_Service.GetAllAsync(true)
      .then((res: any) => {
        this.gameFinish = [] = []
        this.loading = false;
        if (res.success) {
          res.result.forEach((e: any) => {
            this.gameFinish.push(e);
            this.gameFinish = [...this.gameFinish];
          })
        }

      }).catch(e => this.loading = false).then(filldatatable => {
      }
      ).catch(e => this.loading = false)
  }

  async saveGame(form: any) {
    await this.games_Service
      .CreateAsync(this.form.value)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.general_Service.alert(res.message);
          this.initForm()
          this.getGames()
        }
        else this.general_Service.alert(res.message, 'error');
      })
      .catch((e) => (this.loading = false));
  }
}

