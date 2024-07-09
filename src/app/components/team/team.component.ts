import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeggendaService } from 'src/app/service/leggenda.service';
import { Leggende } from 'src/app/models/leggende.interface';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  
  teamName: string = '';
  selectedPlayers: Leggende[] = [];
  availablePlayers : Leggende[] = [];
  availableGoalkeepers!: Leggende[];
  availableDefenders!: Leggende[];
  availableMidfielders!: Leggende[];
  availableForwards!: Leggende[];

  maxGoalkeepers: number = 2;
  maxDefenders: number = 4;
  maxMidfielders: number = 4;
  maxForwards: number = 4;

  selectedGoalkeepers: Leggende[] = [];
  selectedDefenders: Leggende[] = [];
  selectedMidfielders: Leggende[] = [];
  selectedForwards: Leggende[] = [];
  idUser = JSON.parse(localStorage.getItem('user') || '{}')
  
    
  constructor(private leggendeSrv: LeggendaService) { }
  
  ngOnInit(): void {
    
   // Retrieve the item from localStorage
   
   
    this.leggendeSrv.getPlayersByPosition().subscribe((data) => {
      
    this.availablePlayers = data.content;
    
     console.log(data.content)
    });

    this.leggendeSrv.getPlayersByPosition().subscribe((data) => {
     // this.availableDefenders = data;
    });

    this.leggendeSrv.getPlayersByPosition().subscribe((data) => {
     // this.availableMidfielders = data;
    });

    this.leggendeSrv.getPlayersByPosition().subscribe((data) => {
      //this.availableForwards = data;
    });
  }
 /* ngOnInit(): void {
    this.availableGoalkeepers = this.leggendesrv.getPlayersByPosition('Portiere');
    this.availableDefenders = this.leggendesrv.getPlayersByPosition('Difensore');
    this.availableMidfielders = this.leggendesrv.getPlayersByPosition('Centrocampista');
    this.availableForwards = this.leggendesrv.getPlayersByPosition('Attaccante');
  }*/

  addPlayer(leggenda: Leggende, ruolo: string): void {
    
    if (ruolo == 'PORTIERE' && this.selectedGoalkeepers.length < this.maxGoalkeepers) {

      leggenda.teamId = this.idUser.id
      this.selectedGoalkeepers.push(leggenda);
      console.log(this.selectedGoalkeepers)
      this.availablePlayers = this.availablePlayers.filter(p => p.id !== leggenda.id);
    } else if (ruolo === 'DIFENSORE' && this.selectedDefenders.length < this.maxDefenders) {
      leggenda.teamId = this.idUser.id
      this.selectedDefenders.push(leggenda);
      this.availablePlayers = this.availablePlayers.filter(p => p.id !== leggenda.id);
    } else if (ruolo === 'CENTROCAMPISTA' && this.selectedMidfielders.length < this.maxMidfielders) {
      leggenda.teamId = this.idUser.id
      this.selectedMidfielders.push(leggenda);
      this.availablePlayers = this.availablePlayers.filter(p => p.id !== leggenda.id);
    } else if (ruolo === 'ATTACCANTE' && this.selectedForwards.length < this.maxForwards) {
       this.availablePlayers = this.availablePlayers.filter(p => p.id !== leggenda.id);
       leggenda.teamId = this.idUser.id
       this.selectedForwards.push(leggenda);
    }
  }

  removePlayer(leggenda: Leggende, ruolo: string): void {
    if (ruolo === 'PORTIERE') {
      this.selectedGoalkeepers = this.selectedGoalkeepers.filter(p => p.id !== leggenda.id);
      this.availableGoalkeepers.push(leggenda);
    } else if (ruolo === 'DIFENSORE') {
      this.selectedDefenders = this.selectedDefenders.filter(p => p.id !== leggenda.id);
      this.availableDefenders.push(leggenda);
    } else if (ruolo === 'CENTROCAMPISTA') {
      this.selectedMidfielders = this.selectedMidfielders.filter(p => p.id !== leggenda.id);
      this.availableMidfielders.push(leggenda);
    } else if (ruolo === 'ATTACCANTE') {
      this.selectedForwards = this.selectedForwards.filter(p => p.id !== leggenda.id);
      this.availableForwards.push(leggenda);
    }
  }

  finalizeTeam(): void {
    
    this.selectedPlayers = [
      ...this.selectedGoalkeepers,
      ...this.selectedDefenders,
      ...this.selectedMidfielders,
      ...this.selectedForwards
    ];

    
     this.selectedPlayers.forEach(player => {
console.log(player)
       this.leggendeSrv.updateLeggenda(player).subscribe();
    });
    
    
    
   
    alert ("Squadra salvata")
    console.log('Squadra finale:', this.teamName, this.selectedPlayers);
  }
}
