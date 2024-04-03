import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/services/spotify-service';
import { GameConfigService } from 'src/services/GameConfigService';

interface SpotifyTrack {
  id: string;
  preview_url: string;
  artists: [{ name: string }];
  name: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-easy-mode',
  templateUrl: './easy-mode.component.html',
  styleUrls: ['./easy-mode.component.css']
})

export class EasyModeComponent implements OnInit {
  tracks: SpotifyTrack[] = [];
  playedTracks = new Set<string>();
  currentTrackIndex: number = 0;
  currentTrack?: SpotifyTrack;
  artistOptions: string[] = [];
  score: number = 0;
  attempts: number = 0;
  totalOptions: number = 4;
  feedbackMessage: string = '';

  constructor(
    private spotifyService: SpotifyService,
    private gameConfigService: GameConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetGameState();
    this.gameConfigService.currentConfig.subscribe(config => {
      if (config && config.genre) {
        this.totalOptions = config.artists || this.totalOptions;
        this.spotifyService.fetchTracksByGenre(config.genre).subscribe({
          next: (tracks) => {
            this.tracks = tracks.filter(track => track.preview_url && this.isValidArtistName(track.artists[0].name) && !this.playedTracks.has(track.id));
            this.shuffleArray(this.tracks);
            this.loadTrack();
          },
          error: (error) => console.error('Error fetching tracks:', error),
        });
      } else {
        console.warn('No game configuration found.');
        this.router.navigate(['/']);
      }
    });
  }

  loadTrack(): void {
    this.feedbackMessage = '';
    if (this.currentTrackIndex >= this.tracks.length || this.currentTrackIndex >= 5) {
      this.endGame();
      return;
    }
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.playedTracks.add(this.currentTrack.id);
    this.prepareOptions();
    this.attempts = 0;
    if (this.currentTrack) {
      this.gameConfigService.addPlayedTrack(this.currentTrack.id);
    }
  }

  prepareOptions(): void {
    if (!this.currentTrack) return;

    let options = [this.currentTrack.artists[0].name];
    let potentialOptions = this.tracks
      .filter(track => track.id !== this.currentTrack!.id && !this.playedTracks.has(track.id))
      .map(track => track.artists[0].name)
      .filter(name => this.isValidArtistName(name));

    potentialOptions = [...new Set(potentialOptions)];

    while (options.length < this.totalOptions && potentialOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * potentialOptions.length);
      const option = potentialOptions.splice(randomIndex, 1)[0];
      if (!options.includes(option)) {
        options.push(option);
      }
    }

    this.artistOptions = this.shuffleArray(options);
  }

  isValidArtistName(name: string): boolean {
    return !name.toLowerCase().includes("playlist") && name.length < 50;
  }


  guess(option: string): void {
    if (!this.currentTrack) return;

    if (option === this.currentTrack.artists[0].name) {
      this.feedbackMessage = 'Correct!';
      this.score++;
      setTimeout(() => this.moveToNextTrack(), 800)
    } else {
      this.attempts++;
      if (this.attempts < 2) {
        this.feedbackMessage = 'Incorrect. Try again.';
      } else {
        this.feedbackMessage = 'Incorrect. Moving to the next question.';
        setTimeout(() => this.moveToNextTrack(), 800);
      }
    }
  }

  moveToNextTrack(): void {
    this.feedbackMessage = '';
    this.attempts = 0;
    this.currentTrackIndex++;
    if (this.currentTrackIndex < 5) {
      this.loadTrack();
    } else {
      this.endGame();
    }
  }

  endGame(): void {
    this.router.navigate(['/end-game'], { state: { score: this.score } });
    this.resetGameState();
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  resetGameState(): void {
    this.currentTrackIndex = 0;
    this.score = 0;
    this.attempts = 0;
    this.playedTracks.clear();
    this.gameConfigService.currentConfig.subscribe(config => {
      if (config && config.genre) {
        this.totalOptions = config.artists || this.totalOptions;
      } else {
        console.warn('No game configuration found.');
        this.router.navigate(['/']);
      }
    });
  }
}
