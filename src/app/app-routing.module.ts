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

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
    path: '**',
    component: PageNotFoundComponent
  },
]

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    FootballTeamComponent,
    PageNotFoundComponent,
    GamesComponent,
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
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,    
    RouterModule.forRoot(routes)],
  exports: [
    AdminComponent,
    LoginComponent,
    FootballTeamComponent,
    GamesComponent,    
    DashboardComponent,
    RouterModule]
})
export class AppRoutingModule { }
