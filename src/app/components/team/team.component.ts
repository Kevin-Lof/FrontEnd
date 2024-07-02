import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/service/team.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: any[] = [];
  credits!: number;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.team = this.teamService.getTeam();
    this.credits = this.teamService.getCredits();
  }

  login(form: NgForm) {
    if (form.valid) {
      this.teamService.createTeam(form.value).subscribe(response => {
        console.log('Team created:', response);
        form.reset();
      }, error => {
        console.error('Error creating team:', error);
      });
    }
  }
}
