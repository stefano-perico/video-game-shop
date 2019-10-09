import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../models/game.model';
import {Subscription} from 'rxjs';
import {GamesService} from '../../services/games.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-game-list',
  templateUrl: './admin-game-list.component.html',
  styleUrls: ['./admin-game-list.component.scss']
})
export class AdminGameListComponent implements OnInit, OnDestroy {

  games: Game[];
  gamesSubscription: Subscription;

  constructor(
    private gamesService: GamesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gamesSubscription = this.gamesService.gamesSubject.subscribe(
      (games: Game[]) => {
        this.games = games;
      }
    );

    this.gamesService.getGames();
    this.gamesService.emitGames();
  }

  onNewGame() {
    this.router.navigate(['/admin', 'games', 'new']);
  }

  onEditGame(id: number) {
    this.router.navigate(['/admin', 'games', 'edit', id]);
  }

  onDeleteGame(game: Game) {
    this.gamesService.removeGame(game);
  }

  onViewGame(id: number) {
    this.router.navigate(['/games', 'view', id]);
  }

  ngOnDestroy(): void {
    this.gamesSubscription.unsubscribe();
  }

}
