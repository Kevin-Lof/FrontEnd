import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UtentiComponent } from './components/utenti/utenti.component';
import { UtentiDetailsComponent } from './components/utenti-details/utenti-details.component';
import { LeggendeComponent } from './components/leggende/leggende.component';
import { TeamComponent } from './components/team/team.component';
import { LeagueComponent } from './components/league/league.component';




const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  
  },
  {
    path: 'utenti/:id',
    component: UtentiDetailsComponent,

    
  },
  {
    path: 'utenti',
    component: UtentiComponent,
    
  },
  {
    path: 'leggende',
    component: LeggendeComponent,
    
  }, 
  {
    path: 'team',
    component: TeamComponent,
    
  },
  {
    path: 'league',
    component: LeagueComponent,
    
  }
  
];
@NgModule({
  declarations: [AppComponent, HomeComponent, NavBarComponent,RegisterComponent, LoginComponent, UtentiComponent, UtentiDetailsComponent, LeggendeComponent, TeamComponent, LeagueComponent ],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule],
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
