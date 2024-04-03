import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameConfigService } from 'src/services/GameConfigService';

interface PlayerScore {
  name: string;
  score: number;
  timestamp: number;
}

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {
  score: number = 0;
  resultMessage: string = '';
  playerName: string = '';
  showForm: boolean = true;
  mode: string = '';

  constructor(private gameConfigService: GameConfigService, private router: Router) { }

  ngOnInit(): void {
    this.score = history.state?.score || 0;
    this.resultMessage = this.score >= 3 ? 'Congratulations, you won!' : 'Sorry, you lost.';
  }

  playAgain(): void {
    const config = this.gameConfigService.getConfig();

    if (config) {
      this.router.navigate([`/${config.mode}-mode`]);
    } else {
      console.error("No configuration found.");
    }
  }


  submitName(name: string): void {
    name = name.trim();
    this.playerName = '';


    if (!name) {
      alert('Please enter your name.');
      return;
    } else {
      this.showForm = false;
    }

    const newScore: PlayerScore = { name, score: this.score, timestamp: Date.now() };
    let scores: PlayerScore[] = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    scores.push(newScore);
    scores = scores.sort((a, b) => b.score - a.score || b.timestamp - a.timestamp).slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(scores));
  }
}
