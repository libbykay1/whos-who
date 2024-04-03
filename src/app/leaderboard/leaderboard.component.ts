import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PlayerScore {
  name: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: PlayerScore[] = [];

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    const leaderboardData = localStorage.getItem('leaderboard');
    if (leaderboardData) {
      this.leaderboard = JSON.parse(leaderboardData)
        .sort((a: PlayerScore, b: PlayerScore) => b.score - a.score)
        .slice(0, 10);
    }
  }

  clearLeaderboard(): void {
    localStorage.removeItem('leaderboard');
    this.leaderboard = [];
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
