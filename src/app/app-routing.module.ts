import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './pages/admin/menu-admin/admin.component';
import { FootballTeamComponent } from './pages/admin/teams/football-team.component';
import { GamesComponent } from './pages/admin/games/games.component';
import { PageNotFoundComponent } from './pages/admin/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule}  from '@angular/material/paginator';
import { MatDialogModule}  from '@angular/material/dialog';
import { PopupScoresComponent } from './pages/admin/games/popup-scores/popup-scores.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SessionBetComponent } from './pages/admin/session-bet/session-bet.component';
import { RecordBetComponent } from './pages/admin/record-bet/record-bet.component';
import { UserMenuComponent } from './pages/user/menu-user/userMenu.component';
import { PopUpUpdateScoresUserComponent } from './pages/admin/record-bet/pop-up-uodate-scores-user/pop-up-uodate-scores-user.component';
import { SummaryGamesComponent } from './pages/admin/summary-games/summary-games.component';
import { LoadingComponent } from './pages/admin/loading/loading.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'summary',
    component: SummaryGamesComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'userMenu',
    component: UserMenuComponent
  },
  {
    path: 'team',
    component: FootballTeamComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'sessionBets',
    component: SessionBetComponent
  },
  {
    path: 'recordBets',
    component: RecordBetComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    UserMenuComponent,
    LoadingComponent,
    FootballTeamComponent,
    PageNotFoundComponent,
    PopupScoresComponent,
    PopUpUpdateScoresUserComponent,
    GamesComponent,
    SessionBetComponent,
    RecordBetComponent,
    SummaryGamesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatPaginatorModule,  
    MatDialogModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes)],
  exports: [
    AdminComponent,
    UserMenuComponent,
    LoginComponent,
    LoadingComponent,
    FootballTeamComponent,
    GamesComponent,    
    PopupScoresComponent,
    SummaryGamesComponent,
    PopUpUpdateScoresUserComponent,
    DashboardComponent,
    SessionBetComponent,
    RecordBetComponent,
    RouterModule]
})
export class AppRoutingModule { }
