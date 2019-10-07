import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameListComponent} from './game-list/game-list.component';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SingleGameComponent} from './game-list/single-game/single-game.component';
import {AdminGameListComponent} from './admin/admin-game-list/admin-game-list.component';
import {AdminGameFormComponent} from './admin/admin-game-form/admin-game-form.component';


const routes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'games/view/:id', component: SingleGameComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'admin/games', component: AdminGameListComponent },
  { path: 'admin/games/new', component: AdminGameFormComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full'},
  { path: '**', redirectTo: '/games' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
