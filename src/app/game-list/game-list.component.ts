import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../models/game.model';
import {Subscription} from 'rxjs';
import {GamesService} from '../services/games.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {

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

  onViewBook(id: number) {
    this.router.navigate(['/games', 'view', id]);
  }

  ngOnDestroy(): void {
    this.gamesSubscription.unsubscribe();
  }

}
