import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GameListComponent } from './game-list/game-list.component';
import { SingleGameComponent } from './game-list/single-game/single-game.component';
import { AdminGameListComponent } from './admin/admin-game-list/admin-game-list.component';
import { AdminGameFormComponent } from './admin/admin-game-form/admin-game-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './services/auth-guard.service';
import {GamesService} from './services/games.service';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    GameListComponent,
    SingleGameComponent,
    AdminGameListComponent,
    AdminGameFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    GamesService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
