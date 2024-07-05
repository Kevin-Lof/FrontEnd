import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
 

  apiUrL = environment.apiURL;
  constructor(private http:HttpClient) {   }// Modifica con l'URL del tuo backend


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrL}utenti`);
  }

  createLeague(leagueName: string, users: any[]): Observable<any> {
    const payload = { name: leagueName, users: users.map(user => user.id) };
    return this.http.post<any>(`${this.apiUrL}league`, payload);
  }
}
