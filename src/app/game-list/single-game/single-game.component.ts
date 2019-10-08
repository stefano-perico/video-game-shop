import { Component, OnInit } from '@angular/core';
import {Game} from '../../models/game.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GamesService} from '../../services/games.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss']
})
export class SingleGameComponent implements OnInit {

  game: Game;
  isAuth: boolean;

  constructor(
    private router: Router,
    private gamesService: GamesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.game = new Game('', '', null);
    const id = this.route.snapshot.params.id;

    this.gamesService.getSingleGame(+id)
      .then(
        (game: Game) => this.game = game
      );

    firebase.auth().onAuthStateChanged(
      (user) => user ? this.isAuth = true : this.isAuth = false
    );
  }

  onBack() {
    this.router.navigate(['/games']);
  }

  onDeleteGame(game: Game) {
    this.gamesService.removeGame(game);
  }

}
