import { Injectable } from '@angular/core';
import {Game} from '../models/game.model';
import {Subject} from 'rxjs';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games: Game[] = [];
  gamesSubject =  new Subject<Game[]>();

  constructor() {
    this.getGames();
  }

  emitGames() {
    this.gamesSubject.next(this.games);
  }

  saveGames() {
    firebase.database().ref('/games').set(this.games);
  }

  getGames() {
    firebase.database().ref('/games')
      .on('value', (data: DataSnapshot) => {
          this.games = data.val() ? data.val() : [];
          this.emitGames();
        }
      );
  }

  getSingleGame(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`/games/${id}`).once('value')
          .then(
            (data: DataSnapshot) => resolve(data.val()),
            (error) => reject(error)
          );
      }
    );
  }

  createNewGames(game: Game) {
    this.games.push(game);
    this.saveGames();
    this.emitGames();
  }

  removeGame(game: Game) {
    const gameIndexToRemove = this.games.findIndex(
      (gameElement) => {
        if (gameElement === game) {
          return true;
        }
      }
    );

    this.games.splice(gameIndexToRemove, 1);
    this.saveGames();
    this.emitGames();
  }
}
