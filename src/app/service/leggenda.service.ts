import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Leggende, LeggendeResponse } from '../models/leggende.interface';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeggendaService {
  

  apiUrL = environment.apiURL;
  constructor(private http:HttpClient) {   }

  private leggende: Leggende[] = [];

  //getPlayersByPosition(ruolo: 'Portiere' | 'Difensore' | 'Centrocampista' | 'Attaccante'): Leggende[] {
    //return this.players.filter(player => player.ruolo === ruolo);
  //}
 // getPlayersByPosition(ruolo: 'Portiere' | 'Difensore' | 'Centrocampista' | 'Attaccante'): Observable<Leggende[]> {
  //const filteredPlayers = this.leggende.filter(player => player.ruolo === ruolo);
  //return of(filteredPlayers);
//}
//getPlayersByPosition(){
//  const url = `${this.apiUrL}leggende`;
 // return this.http.get<LeggendeResponse[]>(url);
//}
getPlayersByPosition() : Observable<LeggendeResponse>{
  return this.http.get<LeggendeResponse>(`${this.apiUrL}leggende`);
}

updateLeggenda(leggenda: Leggende): Observable<LeggendeResponse> {
  return this.http.put<LeggendeResponse>(`${this.apiUrL}leggende/${leggenda.id}`, leggenda);
}
}