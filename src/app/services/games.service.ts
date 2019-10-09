import { Injectable } from '@angular/core';
import {Game} from '../models/game.model';
import {Observable, Subject} from 'rxjs';
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

  updateGame(id: number, game: Game) {
    this.games.splice(id, 1, game);
    this.saveGames();
    this.emitGames();
  }

  removeGame(game: Game) {
    if (game.image) {
      const storageRef = firebase.storage().refFromURL(game.image);
      storageRef.delete()
        .then(
          () => console.log('Image supprimé')
        )
        .catch(
          (error) => console.log(`Image non trouvée : ${error}`)
        );
    }

    const gameIndexToRemove = this.games.findIndex(
      (gameElement) => {
        if (gameElement === game) {
          return true;
        }
      }
    );

    if (confirm(`voulez-vous vraiment supprimer ${game.name} ?`)) {
      this.games.splice(gameIndexToRemove, 1);
      this.saveGames();
      this.emitGames();
    }
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const createUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child(`images/${createUniqueFileName}${file.name}`).put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => console.log(`Chargement de ${file.name}`),
            (error) => {
              console.log(`Erreur de chargement : ${error}`);
              reject();
            },
          () => resolve(upload.snapshot.ref.getDownloadURL())
          );
      }
    );
  }
}
