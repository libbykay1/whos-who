import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameConfig } from 'src/app/game-config-model';

@Injectable({
  providedIn: 'root',
})
export class GameConfigService {
    private configSource = new BehaviorSubject<GameConfig | null>(null);
    currentConfig = this.configSource.asObservable();
    private playedTracks = new Set<string>();


  constructor() {}

  setConfig(config: GameConfig) {
    this.configSource.next(config);
    this.playedTracks.clear();
  }

  getConfig(): GameConfig | null {
    return this.configSource.getValue();
    }
    
    addPlayedTrack(trackId: string) {
    this.playedTracks.add(trackId);
    }
    
    setPlayedTracks(trackIds: string[]) {
    this.playedTracks = new Set(trackIds);
    }


  getPlayedTracks(): Set<string> {
    return this.playedTracks;
  }
}
