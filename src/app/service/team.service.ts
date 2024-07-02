import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Team, TeamResponse } from '../models/team.interface';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  
 
   // private apiUrl = environment.apiURL;
    private apiUrl = 'http://localhost:8080/squadre';
    constructor(private http: HttpClient) { }
  
    createTeam(team: Team): Observable<Team> {
      return this.http.post<Team>(this.apiUrl, team);
    }
  

  private team = [];
  private credits = 1000; // Iniziamo con 1000 crediti



  getTeam() {
    return this.team;
  }

  getCredits() {
    return this.credits;
  }

 /* buyLegend(leggenda) {
    if (this.credits >= leggenda.valore) {
      this.team.push(leggenda);
      this.credits -= leggenda.valore;
      return true;
    }
    return false;
  }
  */
}
