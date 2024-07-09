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

  creaLega(nome: string, utentiIds: number[]): Observable<any> {
    const lega = { nome, utenti: utentiIds };
    return this.http.post(this.apiUrL, lega);
  }
}
