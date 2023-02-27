import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-popup-scores',
  templateUrl: './popup-scores.component.html',
  styleUrls: ['./popup-scores.component.scss']
})
export class PopupScoresComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Record: Record = new Record();
  loading: boolean = false;

  message: string = "Hola Mundo!"

  @Output() messageEvent = new EventEmitter<string>();



  constructor(
    public dialogRef: MatDialogRef<PopupScoresComponent>,
    private games_Service: GameService,
    private general_Service: GeneralService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.Record.ID = data.id,
      this.Record.GoalsA = data.goalsA,
      this.Record.GoalsB = data.goalsB,
      this.Record.TeamA = data.teamA,
      this.Record.TeamB = data.teamB
  }

  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      goalsA: [null, [Validators.required, Validators.min(0)]],
      goalsB: [null, [Validators.required, Validators.min(0)]],
      finalized: [false]
    });

  }


  async ngOnInit() {
    this.initForm();
  }

  UpdateGame(form) {
    form.value.id = this.Record.ID
    console.log(form.value)
    this.UpdateScore(form)
  }


  async UpdateScore(form: any) {
    await this.games_Service
      .UpdateScore(form.value)
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
  Finalized: boolean = false

}


