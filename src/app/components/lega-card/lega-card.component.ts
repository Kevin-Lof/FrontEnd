import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lega-card',
  templateUrl: './lega-card.component.html',
  styleUrls: ['./lega-card.component.scss']
})
export class LegaCardComponent {
  @Input() nomeLega!: string;
  @Input() utenti!: any[];

  constructor() { }
}