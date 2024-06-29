import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Leggende, LeggendeResponse } from '../models/leggende.interface';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeggendaService {

  apiUrL = environment.apiURL;
  constructor(private http:HttpClient) {   }

  getLeggenda(){
    return this.http.get<LeggendeResponse>(`${this.apiUrL}leggende`);
  }
  
   getSpecificLeggenda(id: number) {
    return this.http.get<Leggende>(`${this.apiUrL}leggende/${id}`);
   }
  
  postLeggenda(leggenda: Leggende){
    return this.http.post(`${this.apiUrL}leggende`,leggenda,{ responseType: 'text' });
  }

  filterLeggenda() {
    
  }

}
