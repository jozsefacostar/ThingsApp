import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { GeneralService } from 'src/app/services/general.service';
import { RecordBetService } from 'src/app/services/record-bet.service';

@Component({
  selector: 'app-pop-up-uodate-scores-user',
  templateUrl: './pop-up-uodate-scores-user.component.html',
  styleUrls: ['./pop-up-uodate-scores-user.component.scss']
})
export class PopUpUpdateScoresUserComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Record: Record = new Record();
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PopUpUpdateScoresUserComponent>,
    private recordbet_service: RecordBetService,
    private general_Service: GeneralService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.Record.ID = data.id,
      this.Record.GoalsA = data.goalsA,
      this.Record.GoalsB = data.goalsB,
      this.Record.TeamA = data.teamA,
      this.Record.TeamB = data.teamB,      
      this.Record.SessionBet = data.sessionBet
  }

  initForm() {
    this.form = this.fb.group({
      recordBet: [''],
      goalsA: [null, [Validators.required, Validators.min(0)]],
      goalsB: [null, [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit() {
    this.initForm();
  }

  UpdateGame(form) {
    form.value.recordBet = this.Record.ID
    this.UpdateScore(form.value)
  }


  async UpdateScore(form: any) {
    await this.recordbet_service
      .UpdateAsync(form)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.general_Service.alert(res.message);
          this.initForm()
          this.closeDialog()
        }
        else this.general_Service.alert(res.message, 'error');
      })
      .catch((e) => (this.loading = false));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

export class Record {
  ID: string = '';
  TeamA: string = '';
  TeamB: string = '';
  GoalsA: Number = 0;
  GoalsB: Number = 0;
  Finalized: boolean = false;
  SessionBet: string = ''

}


