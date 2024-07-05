import { Component, OnInit } from '@angular/core';
import { Utenti } from 'src/app/models/utenti.interface';
import { LeagueService } from 'src/app/service/league.service';
import { UtentiComponent } from '../utenti/utenti.component';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
    leagueName: string = '';
    availableUsers: Utenti[] = []; // Dovresti avere un'interfaccia per l'utente
    selectedUsers: Utenti[] = [];
  
    constructor(private leagueSrv: LeagueService) {}
  
    ngOnInit(): void {
      this.loadUsers();
    }
  
    loadUsers(): void {
      this.leagueSrv.getUsers().subscribe(utenti => this.availableUsers = utenti);
    }
  
    toggleSelection(utenti: any): void {
      const index = this.selectedUsers.indexOf(utenti);
      if (index === -1) {
        this.selectedUsers.push(utenti);
      } else {
        this.selectedUsers.splice(index, 1);
      }
    }
  
    createLeague(): void {
      if (this.leagueName && this.selectedUsers.length > 0) {
        this.leagueSrv.createLeague(this.leagueName, this.selectedUsers).subscribe(response => {
          alert('Lega creata con successo!');
          this.leagueName = '';
          this.selectedUsers = [];
        });
      } else {
        alert('Inserisci un nome e seleziona almeno un giocatore.');
      }
    }
  }

