import { Component, OnInit } from '@angular/core';
import { LeggendaService} from 'src/app/service/leggenda.service';
import { Leggende, LeggendeResponse } from 'src/app/models/leggende.interface';

@Component({
  selector: 'app-leggende',
  templateUrl: './leggende.component.html',
  styleUrls: ['./leggende.component.scss']
})
export class LeggendeComponent implements OnInit {
  leggende: Leggende[] = [];

  constructor(private leggendaSrv: LeggendaService) { }

  ngOnInit() {
    this.leggendaSrv.getLeggenda().subscribe((data) => {
      console.log(data);
      this.leggende = data.content;
    });
    
  }

  /*buyLegend(legend) {
    if (this.teamService.buyLegend(legend)) {
      this.legends = this.legends.filter(l => l !== legend);
    } else {
      alert('Non hai abbastanza crediti per acquistare questa leggenda.');
    }
  }*/
} 