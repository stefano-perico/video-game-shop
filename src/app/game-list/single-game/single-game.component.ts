import { Component, OnInit } from '@angular/core';
import {Game} from '../../models/game.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GamesService} from '../../services/games.service';

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss']
})
export class SingleGameComponent implements OnInit {

  game: Game;

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
  }

  onBack() {
    this.router.navigate(['/games']);
  }

}
