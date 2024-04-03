import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"; 
import { AppRoutingModule } from 'src/app/app-routing.module'; 
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { EasyModeComponent } from './easy-mode/easy-mode.component';
import { HardModeComponent } from './hard-mode/hard-mode.component';
import { EndGameComponent } from './end-game/end-game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EasyModeComponent,
    HardModeComponent,
    EndGameComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
