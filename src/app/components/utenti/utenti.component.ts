import { Component, OnInit } from '@angular/core';
import { UtentiService } from 'src/app/service/utenti.service';
import { Utenti, UtentiResponse } from 'src/app/models/utenti.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {
  utenti: Utenti[] = [];

  constructor(private utenteSrv: UtentiService) {}

  ngOnInit(): void {

    // this.utenti = JSON.parse(localStorage.getItem('utente') || '{}');

   this.utenteSrv.getUtente().subscribe((data) => {
      console.log(data);
      this.utenti = data.content;
    });

}
}
