import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { SignalRService } from 'src/app/services/signalr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loading: boolean = false;
  name: any = ''
  idUser: any = ''
  UserLogoutCommand: any

  constructor(
    private UserServicee: UserService,
    private router: Router,
    private signalR: SignalRService,
    private general_Service: GeneralService,
  ) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem("idUser");
    this.name = localStorage.getItem("nameUser");
    this.UserLogoutCommand = { ID: this.idUser }
  }

  ClearStorage() {
    localStorage.clear();
  }

  async logOut() {
    await this.UserServicee
      .Logout(this.UserLogoutCommand)
      .then((res: any) => {
        this.loading = false;
        if (res.success) {
          this.general_Service.alert(res.message);
          console.log(res.result)
          this.ClearStorage()
          this.router.navigate([`./login`])
        }
        else this.general_Service.alert(res.message, 'error');
      })
      .catch((e) => (this.loading = false));
  }





}
