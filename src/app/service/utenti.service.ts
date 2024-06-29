import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Utenti, UtentiResponse } from '../models/utenti.interface';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  apiUrL = environment.apiURL;
  constructor(private http:HttpClient) {   }

  // getUtente() : Observable<UtentiResponse>{
  //   return this.http.get<UtentiResponse>(`${this.apiUrL}utenti`);
  // }
  getUtente(): Observable<any> {
    return this.http.get<any>(this.apiUrL).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    // Puoi aggiungere qui più dettagli per il log degli errori
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }
   getSpecificUtente(id: number) {
    return this.http.get<Utenti>(`${this.apiUrL}Utenti/${id}`);
   }
  
  postUtente(utente: Utenti){
    return this.http.post(`${this.apiUrL}utenti`,utente,{ responseType: 'text' });
  }

  filterUtente() {
    
  }

}
