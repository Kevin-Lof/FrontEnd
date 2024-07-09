import { Component, OnInit } from '@angular/core';
import { Leggende } from 'src/app/models/leggende.interface';
import { LeggendaService } from 'src/app/service/leggenda.service';


@Component({
  selector: 'app-line-up',
  templateUrl: './line-up.component.html',
  styleUrls: ['./line-up.component.scss']
})
export class LineUpComponent implements OnInit {
  selectedPlayers: Leggende[] = [];
  goalkeeper_select = document.getElementById('goalkeeper_select');
  saveUpBtn = document.getElementById('saveUpBtn');
  goalkeeperSelected: boolean = false;
  defenderFirstSelected: boolean = false;
  defenderSecondSelected: boolean = false;
  midfielderFirstSelected: boolean = false;
  midfielderSecondSelected:boolean = false;
  forwardFirstSelected: boolean = false;
  forwardSecondSelected: boolean = false;
  goalkeeperBenchSelected: boolean = false;
  defenderBenchSelected: boolean = false;
  midfielderBenchSelected: boolean = false;
  forwardBenchSelected: boolean = false;
  idUser = JSON.parse(localStorage.getItem('user') || '{}')
  lineUp = JSON.parse(localStorage.getItem('lineup') || '{}')
  
  availablePlayers : Leggende[] = [];
  availableGoalkeepers: Leggende[] = [];
  availableDefenders: Leggende[] = [];
  availableMidfielders: Leggende[] = [];
  availableForwards: Leggende[] = [];

  maxGoalkeepers: number = 1;
  maxDefenders: number = 3;
  maxMidfielders: number = 4;
  maxForwards: number = 3;
  maxBenchPlayers: number = 4;

  selectedGoalkeeper!: Leggende;
  selectedDefender!: Leggende;
  selectedMidfielder!: Leggende;
  selectedForward!: Leggende;
  selectedBenchPlayer!: Leggende;

  selectedBenchPlayers: Leggende[] = [];
  selectedGoalkeepers: Leggende[] = [];
  selectedDefenders: Leggende[] = [];
  selectedMidfielders: Leggende[] = [];
  selectedForwards: Leggende[] = [];

  lineUpGoalkeepers: Leggende[] = [];
  lineUpDefenders: Leggende[] = [];
  lineUpMidfielders: Leggende[] = [];
  lineUpForwards: Leggende[] = [];

  constructor(private leggendeSrv: LeggendaService) { }
  ngOnInit(): void {
    
      this.leggendeSrv.getPlayersByPosition().subscribe((data) => {
      
        this.availablePlayers = data.content;
      
        this.availablePlayers.forEach(player => {
          switch (player.ruolo) {
            case 'ATTACCANTE':
              if(player.teamId == this.idUser.id){
                this.availableForwards.push(player);
             
              }
            break;
            case 'CENTROCAMPISTA':
              if(player.teamId == this.idUser.id){
                this.availableMidfielders.push(player);
               
              }
             
              break;
            case 'DIFENSORE':
              if(player.teamId == this.idUser.id){
                this.availableDefenders.push(player);
              }
              
              break;
            case 'PORTIERE':
              if(player.teamId == this.idUser.id){
                this.availableGoalkeepers.push(player);
              }
             
              break;
            default:
              console.error('Unknown role:', player.ruolo);
          }
        });
  
        });
    
    //   else if(this.lineUp.length !=0){

    //   this.selectedGoalkeepers.push(this.lineUp[0])
    //   this.selectedGoalkeepers.push(this.lineUp[1]) 
    //   this.selectedDefenders.push(this.lineUp[2])
    //   this.selectedDefenders.push(this.lineUp[3])
    //   this.selectedDefenders.push(this.lineUp[4])
    //   this.selectedMidfielders.push(this.lineUp[5])
    //   this.selectedMidfielders.push(this.lineUp[6])
    //   this.selectedMidfielders.push(this.lineUp[7])
    //   this.selectedForwards.push(this.lineUp[8])
    //   this.selectedForwards.push(this.lineUp[9])
    //   this.selectedForwards.push(this.lineUp[10])
    //   this.goalkeeperSelected = true;
    //   this.goalkeeperBenchSelected = true;
    //   this.defenderFirstSelected = true;
    //   this.defenderSecondSelected = true;
    //  this.defenderBenchSelected = true;
    //  this.midfielderFirstSelected = true;
    //  this.midfielderSecondSelected = true;
    //  this.midfielderBenchSelected = true;
    //  this.forwardFirstSelected = true;
    //  this.forwardSecondSelected = true;
    //  this.forwardBenchSelected = true;
 
    // }
  }
    

  selectGoalkeeper(player: Leggende): void {
    this.selectedGoalkeepers.push(player);
    this.availableGoalkeepers = this.availableGoalkeepers.filter(p => p.id !== player.id);
    if(this.goalkeeperSelected){
      this.goalkeeperBenchSelected = true;
    }else{
      this.goalkeeperSelected = true;
    }
    
  }

  selectDefender(player: Leggende): void {
    this.selectedDefenders.push(player);
    this.availableDefenders = this.availableDefenders.filter(p => p.id !== player.id);
    
    if(this.defenderFirstSelected && this.defenderSecondSelected){
      this.defenderBenchSelected = true
    }
    if(this.defenderFirstSelected){
      this.defenderSecondSelected = true
    }
    if(this.defenderSecondSelected == false && this.defenderBenchSelected == false){
      this.defenderFirstSelected = true
    }
    
  }
  selectMidfielder(player: Leggende): void {
    this.selectedMidfielders.push(player);
    this.availableMidfielders = this.availableMidfielders.filter(p => p.id !== player.id);
    if(this.midfielderFirstSelected && this.midfielderSecondSelected){
      this.midfielderBenchSelected = true
    }
    if(this.midfielderFirstSelected){
      this.midfielderSecondSelected = true
    }
    if(this.midfielderSecondSelected == false && this.midfielderBenchSelected == false){
      this.midfielderFirstSelected = true
    }
  }
  selectForward(player: Leggende): void {
    this.selectedForwards.push(player);
    this.availableForwards = this.availableForwards.filter(p => p.id !== player.id);
    if(this.forwardFirstSelected && this.forwardSecondSelected){
      this.forwardBenchSelected = true
    }
    if(this.forwardFirstSelected){
      this.forwardSecondSelected = true
    }
    if(this.forwardSecondSelected == false && this.forwardBenchSelected == false){
      this.forwardFirstSelected = true
    }
  }

  saveLineup():void{
    this.selectedPlayers = [
      ...this.selectedGoalkeepers,
      ...this.selectedDefenders,
      ...this.selectedMidfielders,
      ...this.selectedForwards
    ];
    localStorage.setItem('lineup', JSON.stringify(this.selectedPlayers))
    alert ("Formazione salvata")
  }


}
