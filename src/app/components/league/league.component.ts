import { Component, OnInit } from '@angular/core';
import { Utenti } from 'src/app/models/utenti.interface';
import { LeagueService } from 'src/app/service/league.service';
import { UtentiComponent } from '../utenti/utenti.component';
import { UtentiService } from 'src/app/service/utenti.service';


@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  utenti: Utenti[] = [];
  selectedUtentiIds: number[] = [];
  legaCreata: { nome: string, utenti: Utenti[] } | null = null;
  

  constructor(private leagueSrv: LeagueService, private utentiSrv: UtentiService) { }

  ngOnInit(): void {
    this.getUtenti();
  }

  getUtenti(): void {
 
    this.utentiSrv.getUtente().subscribe((data) => {
      console.log(data);
      this.utenti = data.content;
    });

  }

  creaLega(nomeLega: string): void {
    this.leagueSrv.creaLega(nomeLega, this.selectedUtentiIds).subscribe(response => {
      console.log('Lega creata con successo', response);
      const selectedUtenti = this.utenti.filter(utente => this.selectedUtentiIds.includes(utente.id));
      this.salvaLegaNelLocalStorage(nomeLega, selectedUtenti);
      this.legaCreata = {
        nome: nomeLega,
        utenti: selectedUtenti
      };
    }, error => {
      console.error('Errore nella creazione della lega', error);
    });
  }

  salvaLegaNelLocalStorage(nomeLega: string, utenti: Utenti[]): void {
    const legheSalvate = JSON.parse(localStorage.getItem('leghe') || '[]');
    const nuovaLega = { nome: nomeLega, utenti: utenti };
    legheSalvate.push(nuovaLega);
    localStorage.setItem('leghe', JSON.stringify(legheSalvate));
    console.log('Lega salvata nel localStorage', nuovaLega);
  }

  onUserSelectionChange(userId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedUtentiIds.push(userId);
    } else {
      this.selectedUtentiIds = this.selectedUtentiIds.filter(id => id !== userId);
    }
  }
  
}