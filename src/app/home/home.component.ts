import { Component, OnInit } from "@angular/core";
import fetchFromSpotify, { request } from "../../services/api";
import { Router } from '@angular/router';
import { GameConfigService } from "src/services/GameConfigService";
import { GameConfig } from 'src/app/game-config-model';


const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  genres: string[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: string = "";
  artists: number = 4;
  mode: string = 'easy';
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";

  constructor(private gameConfigService: GameConfigService, private router: Router) { }

  ngOnInit(): void {
    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadGenres(newToken.value);
    });
  }

  loadGenres = async (t: any) => {
    this.configLoading = true;

    // #################################################################################
    // DEPRECATED!!! Use only for example purposes
    // DO NOT USE the recommendations endpoint in your application
    // Has been known to cause 429 errors
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(response);
    // #################################################################################

    this.genres = [
      "pop",
      "hip hop",
      "r&b",
      "rock",
      "rap",
      "indie",
      "country",
      "edm",
      "latin pop",
      "bollywood",
    ]

    this.configLoading = false;
  };

  setGenre(selectedGenre: any) {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
    console.log(TOKEN_KEY);
  }

  setArtists(artists: any) {
    this.artists = artists;
    console.log(this.artists);
    console.log(TOKEN_KEY);
  }

  setMode(mode: any) {
    this.mode = mode;
    console.log(this.mode);
    console.log(TOKEN_KEY);
  }

  onSubmit() {
    if(!this.selectedGenre) {
      alert('Please select a genre.');
      return;
    } else {

    const config: GameConfig = {
      genre: this.selectedGenre,
      artists: this.artists,
      mode: this.mode,
    };


    this.gameConfigService.setConfig(config);
    this.router.navigate([`/${this.mode}-mode`]);}
  }

  goToLeaderboard(): void {
    this.router.navigate(['/leaderboard']);
  }
}
