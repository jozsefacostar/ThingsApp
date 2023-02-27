import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { GeneralService } from 'src/app/services/general.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {


  teams: any[] = [];
  loading: boolean = false;
  dataSource: any[] = []
  form: FormGroup = new FormGroup({});
  flag: boolean = true;

  constructor(
    private fb: FormBuilder,
    private teams_Service: TeamService,
    private general_Service: GeneralService,
    private games_Service: GameService,
  ) {
  }

  initForm() {
    this.form = this.fb.group({
      teamA: [null, [Validators.required]],
      teamB: [null, [Validators.required]],
      dateInitial: [null, [Validators.required]],
    });
  }

  async ngOnInit() {
    this.initForm();
    this.loadData();
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

  async saveGame(form: any) {
    await this.games_Service
      .CreateAsync(this.form.value)
      .then((res: any) => {
        this.loading = false;
        if (res.success) 
        {
          this.general_Service.alert(res.message);
          this.initForm()
        }
        else this.general_Service.alert(res.message, 'error');
      })
      .catch((e) => (this.loading = false));
  }
}


